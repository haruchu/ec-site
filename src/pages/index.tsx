import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from '../components/molecules/button';
import { ButtonWrapper, Wrapper } from '../styles/Share';

const Top: NextPage = () => {
  const router = useRouter();
  return (
    <Wrapper>
      <Head>
        <title>トップ</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ButtonWrapper>
        <Button text='ユーザー登録ページへ' onClick={() => router.push('/signup')} />
        <Button text='ログインページへ' onClick={() => router.push('/login')} />
      </ButtonWrapper>
    </Wrapper>
  );
};

export default Top;
