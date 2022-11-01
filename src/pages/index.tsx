import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { db } from '../../firebase/firebase';
import ListLayout, { ItemType } from '../components/organisms/itemList';
import { Wrapper } from '../styles/Share';

type ListProps = {
  salerName: string;
  defaultItems: ItemType[];
};

const PERITEM = 4;

const Home: NextPage = ({ defaultItems }: ListProps) => {
  const [items, setItems] = useState(defaultItems);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    db.collection('items')
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
        <ListLayout items={items} loadMore={loadMore} hasMore={hasMore} />
      ) : (
        <>ありません</>
      )}
    </Wrapper>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const colRef = db.collection('items').orderBy('uploadDate', 'desc').limit(PERITEM);
  const cardSnap = await colRef.get();
  const defaultItems = cardSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return { props: { defaultItems } };
};
