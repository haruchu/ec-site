import { getDoc } from 'firebase/firestore';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { db } from '../../../firebase/firebase';
import ListLayout, { ItemType } from '../../layout/itemLayout';
import { Point, SalerName, UserName, UserWrapper } from '../../styles/List';
import { Wrapper } from '../../styles/Share';

type ListType = {
  salerName: string;
  defaultItems: ItemType[];
};

const PERITEM = 4;

const List: NextPage = ({ salerName, defaultItems }: ListType) => {
  const [items, setItems] = useState(defaultItems);
  const [hasMore, setHasMore] = useState(true);
  const [point, setPoint] = useState(0);

  const currentUserName = localStorage.getItem('userName');
  const currentUserId = localStorage.getItem('userId');
  const userRef = db.collection('users').doc(currentUserId);
  (async () => {
    const userData = await (await getDoc(userRef)).data();
    setPoint(userData.point);
  })();

  const loadMore = async () => {
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
        <title>{salerName}の商品リスト</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {salerName === currentUserName ? (
        <UserWrapper>
          <UserName>{currentUserName}</UserName>
          <Point>{point}</Point>
        </UserWrapper>
      ) : (
        <></>
      )}
      <SalerName>{salerName}の商品リスト</SalerName>
      {items.length !== 0 ? (
        <ListLayout items={items} loadMore={loadMore} hasMore={hasMore} />
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
