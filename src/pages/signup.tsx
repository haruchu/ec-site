import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { db } from '../../firebase/firebase';
import { Button } from '../components/molecules/button';
import { Input } from '../components/molecules/input';
import { useAuthDispatchUserContext } from '../contexts/AuthContextProvider';
import { ErrorMessage, FormContent, FormLabel, FormWrapper, Wrapper } from '../styles/Form';

type FormValues = {
  name: string;
  password: string;
  password_repeat: string;
};

const Signup: NextPage = () => {
  const { signin } = useAuthDispatchUserContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();

  const handleUpload = async (data: FormValues) => {
    const docRef = db.collection('users').doc();
    const insertData = {
      name: data.name,
      password: data.password,
      point: 1000,
    };
    docRef.set(insertData);
    signin(data.name, data.password);
    router.push('/');
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => signin(data.name, data.password);

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
      <FormWrapper>
        <FormContent>
          <FormLabel>パスワード</FormLabel>
          <Input type='password' {...register('password', { required: true })} />
          {errors.password && errors.password.type === 'required' && (
            <ErrorMessage>パスワードが入力されていません</ErrorMessage>
          )}
        </FormContent>
        <FormContent>
          <FormLabel>パスワード確認</FormLabel>
          <Input
            type='password'
            {...register('password_repeat', {
              validate: (value) => value === watch('password') || 'パスワードが一致しません',
            })}
          />
          {errors.password_repeat && <ErrorMessage>{errors.password_repeat.message}</ErrorMessage>}
        </FormContent>
      </FormWrapper>
      <Button text='登録' />
    </Wrapper>
  );
};
export default Signup;
