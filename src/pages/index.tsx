import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useAuthDispatchUserContext, useLoggedInContext } from '../contexts/AuthContextProvider';
import { getUserInfo } from '../hooks/user';

const Home: NextPage = () => {
  const isLoggedIn = useLoggedInContext();
  const { signout } = useAuthDispatchUserContext();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    getUserInfo().then((data) => {
      setUserName(data[0].name);
    });
    console.log(userName);
    // マウント次のみ実行したいので許容する
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>index</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {isLoggedIn ? 'ログイン' : '未ログイン'}
      {isLoggedIn && <button onClick={() => signout()}>ログアウト</button>}
    </>
  );
};

export default Home;
