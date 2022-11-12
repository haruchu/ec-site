import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../components/molecules/button';
import { Input } from '../components/molecules/input';
import { useAuthDispatchUserContext } from '../contexts/AuthContextProvider';
import { ErrorMessage, FormContent, FormLabel, Wrapper } from '../styles/Form';

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
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => signin(data.name, data.password);

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <Head>
        <title>ログイン</title>
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
