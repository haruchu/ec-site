import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { SubmitHandler, useForm } from 'react-hook-form';
import { v4 } from 'uuid';
import { db, storage } from '../../firebase/firebase';
import { Button } from '../components/molecules/button';
import { Input } from '../components/molecules/input';
import { getUserInfo } from '../hooks/user';
import {
  ErrorMessage,
  FormContent,
  FormDropZone,
  FormImage,
  FormLabel,
  FormWrapper,
  Wrapper,
} from '../styles/Form';
import { getStringFromDate } from './api/item';

type FormValues = {
  name: string;
  point: number;
};

const Upload: NextPage = () => {
  const [myFiles, setMyFiles] = useState<File[]>([]);
  const [hasNotFile, setHasNotFile] = useState(false);
  const [src, setSrc] = useState('');
  const [userName, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    getUserInfo().then((data) => {
      setUserName(data.name);
    });
    // マウント次のみ実行したいので許容する
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const allowImageFileType = ['image/png', 'image/jpeg'];
    if (allowImageFileType.indexOf(acceptedFiles[0].type) === -1) {
      onDropRejected();
      return false;
    }

    try {
      setMyFiles([...acceptedFiles]);
      handlePreview(acceptedFiles);
    } catch (error) {
      alert(error);
    }
  }, []);

  const onDropRejected = () => {
    alert('画像のみ受け付けることができます。');
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
  });

  const handleUpload = async (data: FormValues) => {
    if (!myFiles[0]) {
      setHasNotFile(true);
      return;
    }
    const userIdToken = localStorage.getItem('userId');
    const uuid = v4();
    const date = new Date();
    const CurrentDate = getStringFromDate(date);
    storage.ref(`/images/hoge/${CurrentDate}.png`).put(myFiles[0]);
    const docRef = db.collection('items').doc();
    const insertData = {
      id: uuid,
      name: data.name,
      point: data.point,
      imageId: CurrentDate,
      saler: userName,
      salerId: userIdToken,
      uploadDate: CurrentDate,
    };
    docRef.set(insertData);
    router.push('/home');
  };

  const handlePreview = (files: any) => {
    if (files === null) {
      return;
    }
    const file = files[0];
    if (file === null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSrc(reader.result as string);
    };
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => handleUpload(data);

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <Head>
        <title>出品</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <FormWrapper>
        <FormContent>
          <FormLabel>商品名</FormLabel>
          <Input type='text' {...register('name', { required: true })} />
          {errors.name && errors.name.type === 'required' && (
            <ErrorMessage>商品名が入力されていません</ErrorMessage>
          )}
        </FormContent>
        <FormContent>
          <FormLabel>価格</FormLabel>
          <Input type='text' {...register('point', { required: true, pattern: /\d+/i })} />
          {errors.point && errors.point.type === 'required' && (
            <ErrorMessage>価格が入力されていません</ErrorMessage>
          )}
          {errors.point && errors.point.type === 'pattern' && (
            <ErrorMessage>数値のみ入力可能です</ErrorMessage>
          )}
        </FormContent>
      </FormWrapper>
      <FormContent {...getRootProps()}>
        <FormLabel>商品画像</FormLabel>
        <input {...getInputProps()} type='file' />
        {myFiles.length === 0 ? (
          <FormDropZone>画像を選択</FormDropZone>
        ) : (
          <React.Fragment key={myFiles[0].name}>{src && <FormImage src={src} />}</React.Fragment>
        )}
        {hasNotFile && !myFiles[0] && <ErrorMessage>画像を添付してください</ErrorMessage>}
      </FormContent>
      <Button text='アップロード' />
    </Wrapper>
  );
};
export default Upload;
