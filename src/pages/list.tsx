import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { db } from '../../firebase/firebase';
import { Item } from '../components/item';
import styles from '../styles/Home.module.css';
import { Wrapper } from '../styles/List';

type ItemType = {
  name: string;
  price: number;
  imageId: string;
};

type ListType = {
  items: ItemType[];
};

const List: NextPage = ({ items }: ListType) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>商品リスト</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Wrapper>
          {items.map((item: ItemType, index: number) => (
            <Item key={index} name={item.name} price={item.price} imageId={item.imageId} />
          ))}
        </Wrapper>
      </main>
    </div>
  );
};

export default List;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const colRef = db.collection('items');
  const cardSnap = await colRef.get();
  const items = cardSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return { props: { items } };
};
