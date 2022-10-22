import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useContext } from 'react';
import { db } from '../../firebase/firebase';
import { AuthInfoContext, LoggedInContext } from '../contexts/AuthContextProvider';
import styles from '../styles/Home.module.css';

const Home: NextPage = ({ data }: any) => {
  const isLoggedIn = useContext(LoggedInContext);
  const [authInfo, setAuthInfo] = useContext(AuthInfoContext);

  return (
    <>
      {isLoggedIn ? "ログイン" : "未ログイン"}
      {isLoggedIn && <button onClick={() => setAuthInfo({ userId: "" })}>ログアウト</button>}
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const colRef = db.collection('items');
  const cardSnap = await colRef.get();
  const data = cardSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log(data);
  return { props: { data } };
};
