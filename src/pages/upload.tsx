import { NextPage } from 'next';
import { useRouter } from 'next/router'
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { db, storage } from '../../firebase/firebase';
import {
  FormContent,
  FormDropZone,
  FormImage,
  FormInput,
  FormLabel,
  Wrapper,
} from '../styles/Upload';
import { getStringFromDate } from './api/item';

const Upload: NextPage = () => {
  const [myFiles, setMyFiles] = useState<File[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [src, setSrc] = useState('');
  const router = useRouter()

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

  const handleUpload = async () => {
    const date = new Date();
    const imageId = getStringFromDate(date);
    storage.ref(`/images/hoge/${imageId}.png`).put(myFiles[0]);
    const docRef = db.collection("items").doc();
    const insertData = {
      name: name,
      price: price,
      imageId: imageId
    };
    docRef.set(insertData);
    router.push('/');
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

  return (
    <Wrapper>
      <FormContent>
        <FormLabel>商品名</FormLabel>
        <FormInput type='text' name='name' required onChange={(e) => setName(e.target.value)} />
      </FormContent>
      <FormContent>
        <FormLabel>価格</FormLabel>
        <FormInput
          type='text'
          name='price'
          required
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </FormContent>
      <div {...getRootProps()}>
        <FormLabel>商品画像</FormLabel>
        <input {...getInputProps()} type='file' />
        {myFiles.length === 0 ? (
          <FormDropZone>ここをクリック。または画像をドラッグ＆ドロップしてください</FormDropZone>
        ) : (
          <React.Fragment key={myFiles[0].name}>{src && <FormImage src={src} />}</React.Fragment>
        )}
      </div>
      <button type='submit' onClick={() => handleUpload()}>
        アップロード
      </button>
    </Wrapper>
  );
};
export default Upload;
