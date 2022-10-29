import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { db } from '../../firebase/firebase';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { useAuthDispatchUserContext, useLoggedInContext } from '../contexts/AuthContextProvider';
import { ErrorMessage, FormContent, FormLabel, FormWrapper, Wrapper } from '../styles/Form';

type FormValues = {
  name: string;
  password: string;
  password_repeat: string;
};

const Login: NextPage = () => {
  const { signin } = useAuthDispatchUserContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();

  const handleUpload = async (data: FormValues) => {
    const colRef = db.collection('users');
    const userSnap = await colRef.where('name', '==', data.name).get();
    const userData = userSnap.docs.map((doc) => ({
      ...doc.data(),
    }));
    signin(userData[0].id, data.name, data.password);
    router.push('/list');
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => handleUpload(data);

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <Head>
        <title>ユーザー登録</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <FormContent>
        <FormLabel>ユーザー名</FormLabel>
        <Input type='text' {...register('name', { required: true })} />
        {errors.name && errors.name.type === 'required' && (
          <ErrorMessage>ユーザ名が入力されていません</ErrorMessage>
        )}
      </FormContent>
      <FormContent>
        <FormLabel>パスワード</FormLabel>
        <Input type='password' {...register('password', { required: true })} />
        {errors.password && errors.password.type === 'required' && (
          <ErrorMessage>パスワードが入力されていません</ErrorMessage>
        )}
      </FormContent>
      <Button text='ログイン' />
    </Wrapper>
  );
};
export default Login;
