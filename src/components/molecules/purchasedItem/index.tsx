import { getDownloadURL, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { X } from 'react-feather';
import { storage } from '../../../../firebase/firebase';
import { Wrapper, StyledImage, Text, Price, ItemInfo, DeleteButton, RightParts } from './style';

type ItemProps = {
  id: string;
  name: string;
  price: number;
  imageId: string;
  salerName: string;
  onModalOpen: () => void;
  onCarOut: () => void;
};

export const PurchasedItem = ({ name, price, imageId, onCarOut }: ItemProps) => {
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
            <Price>{price}</Price>
            <DeleteButton onClick={() => onCarOut()}>
              <X />
            </DeleteButton>
          </RightParts>
        </ItemInfo>
      </Wrapper>
    </>
  );
};
