import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useAuthDispatchUserContext, useLoggedInContext } from '../contexts/AuthContextProvider';
import { getUserInfo } from '../hooks/user';

const NotFound: NextPage = () => {
  console.log('ss');
  return (
    <>
      <Head>
        <title>404 NotFound</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <span>ページが見つかりませんでした</span>
    </>
  );
};

export default NotFound;
