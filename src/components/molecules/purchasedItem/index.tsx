import { getDownloadURL, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { X } from 'react-feather';
import { storage } from '../../../../firebase/firebase';
import {
  Wrapper,
  StyledImage,
  Text,
  Point,
  ItemInfo,
  DeleteButton,
  RightParts,
  Count,
} from './style';

type ItemProps = {
  id: string;
  name: string;
  point: number;
  count: string;
  imageId: string;
  salerName: string;
  onModalOpen: () => void;
  onCarOut: () => void;
};

export const PurchasedItem = ({ name, point, count, imageId, onCarOut }: ItemProps) => {
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
        <StyledImage src={url} />
        <ItemInfo>
          <Text>{name}</Text>
          <RightParts>
            <Point>{point}</Point>
            <Count>{count}</Count>
            <DeleteButton onClick={() => onCarOut()}>
              <X />
            </DeleteButton>
          </RightParts>
        </ItemInfo>
      </Wrapper>
    </>
  );
};
