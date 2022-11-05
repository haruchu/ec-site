import { getDownloadURL, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { Maximize2 } from 'react-feather';
import { storage } from '../../../../firebase/firebase';

import {
  ItemInfo,
  MaximizeButton,
  StyledImage,
  StyledImageButton,
  StyledName,
  StyledPrice,
  Wrapper,
} from './style';
type ItemProps = {
  name: string;
  price: number;
  imageId: string;
  onModalOpen: () => void;
};

export const Item = ({ name, price, imageId, onModalOpen }: ItemProps) => {
  const [url, setURL] = useState('');

  useEffect(() => {
    const gsReference = ref(storage, `gs://ec-0831.appspot.com/images/hoge/${imageId}.png`);
    getDownloadURL(gsReference)
      .then((fileURL) => {
        setURL(fileURL);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Wrapper>
        <MaximizeButton onClick={() => onModalOpen()}>
          <Maximize2 />
        </MaximizeButton>
        <StyledImageButton onClick={() => onModalOpen()}>
          <StyledImage src={url} />
        </StyledImageButton>
        <ItemInfo>
          <StyledName>{name}</StyledName>
          <StyledPrice>{price}</StyledPrice>
        </ItemInfo>
      </Wrapper>
    </>
  );
};
