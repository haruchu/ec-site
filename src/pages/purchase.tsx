import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { onCartOutFunc } from '../hooks/purchase';
import { ItemType } from '../layout/itemLayout';
import PurchasedListLayout from '../layout/purchasedLayout';
import { Wrapper } from '../styles/Share';

const PERITEM = 4;

const Cart: NextPage = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  const refreshCartItems = () => {
    const purchasedItemsInfoJson = localStorage.getItem('purchasedItems');
    const purchasedItemsInfo =
      purchasedItemsInfoJson == null ? [] : JSON.parse(purchasedItemsInfoJson);
    setCartItems(purchasedItemsInfo.map((item) => item.id));
  };

  useEffect(() => {
    refreshCartItems();
  }, []);

  const loadMore = async () => {
    db.collection('items')
      .where('id', 'in', cartItems)
      .orderBy('uploadDate', 'desc')
      .limit(1)
      .startAfter(items[items.length - 1].uploadDate)
      .onSnapshot(function (querySnapshot) {
        const lists = [];
        querySnapshot.forEach(function (doc) {
          lists.push({ key: doc.id, ...doc.data() });
        });
        if (!lists.length) {
          setHasMore(false);
          return;
        }
        setTimeout(() => {
          setItems([...items, ...lists]);
        }, 10);
      });
  };

  const get = async () => {
    if (cartItems && cartItems.length > 0) {
      const colRef = db
        .collection('items')
        .where('id', 'in', cartItems)
        .orderBy('uploadDate', 'desc')
        .limit(PERITEM);
      const cardSnap = await colRef.get();
      const purchasedItems = cardSnap.docs.map((doc) => ({
        ...doc.data(),
      }));
      return purchasedItems;
    } else {
      return [];
    }
  };

  useEffect(() => {
    get().then((data) => {
      if (data.length > 0) {
        const newItems: ItemType[] = [
          {
            id: data[0].id,
            name: data[0].name,
            price: data[0].price,
            imageId: data[0].imageId,
            saler: data[0].saler,
            uploadDate: data[0].uploadDate,
          },
        ];
        setItems([...items, ...newItems]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  const onCartOut = (id: string) => {
    onCartOutFunc(id);
    setItems([]);
    refreshCartItems();
  };

  return (
    <Wrapper>
      <Head>
        <title>商品リスト</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {items.length !== 0 ? (
        <PurchasedListLayout
          items={items}
          loadMore={loadMore}
          hasMore={hasMore}
          onCartOut={(id) => onCartOut(id)}
        />
      ) : (
        <>ありません</>
      )}
    </Wrapper>
  );
};

export default Cart;
