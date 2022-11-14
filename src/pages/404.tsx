import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from '../components/molecules/button';
import { useAuthDispatchUserContext, useLoggedInContext } from '../contexts/AuthContextProvider';
import { getUserInfo } from '../hooks/user';
import { Wrapper } from '../styles/Share';

const NotFound: NextPage = () => {
  const router = useRouter();
  return (
    <Wrapper>
      <Head>
        <title>404 NotFound</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <span>ページが見つかりませんでした</span>
      <Button text='戻る' onClick={() => router.back()} />
    </Wrapper>
  );
};

export default NotFound;
