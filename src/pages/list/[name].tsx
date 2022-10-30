import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { db } from '../../../firebase/firebase';
import { Item } from '../../components/molecules/item';
import { Wrapper, StyledInfiniteScroll } from '../../styles/List';

type ItemType = {
  name: string;
  price: number;
  imageId: string;
  uploadDate: string;
};

type ListType = {
  salerName: string;
  defaultItems: ItemType[];
};

const PERITEM = 4;

const List: NextPage = ({ salerName, defaultItems }: ListType) => {
  const [items, setItems] = useState(defaultItems);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async (page: any) => {
    db.collection('items')
      .where('saler', '==', salerName)
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

  return (
    <Wrapper>
      <Head>
        <title>商品リスト</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {items.length !== 0 ? (
        <StyledInfiniteScroll loadMore={loadMore} hasMore={hasMore}>
          {items.map((item, index) => (
            <Item
              key={index}
              name={item.name}
              price={item.price}
              imageId={item.imageId}
              salerName={salerName}
            />
          ))}
        </StyledInfiniteScroll>
      ) : (
        <>ありません</>
      )}
    </Wrapper>
  );
};

export default List;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const salerName = context.query.name;
  const colRef = db
    .collection('items')
    .where('saler', '==', salerName)
    .orderBy('uploadDate', 'desc')
    .limit(PERITEM);
  const cardSnap = await colRef.get();
  const defaultItems = cardSnap.docs.map((doc) => ({
    ...doc.data(),
  }));
  return { props: { salerName, defaultItems } };
};
