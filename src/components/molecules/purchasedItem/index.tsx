import { getDownloadURL, ref } from 'firebase/storage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { X } from 'react-feather';
import { storage } from '../../../../firebase/firebase';
import { Count } from '../count';
import {
  StyledModal,
  modalStyle,
  ModalWrapper,
  ModalCloseButton,
  ModalLeft,
  ModalImage,
  ModalRight,
  ModalItemName,
  SalerWrapper,
  ModalSeller,
  ModalItemPrice,
  BuyButtonWrapper,
  StyledButton,
} from '../item/style';
import { Wrapper, StyledImage, Text, Price, ItemInfo, DeleteButton } from './style';

type ItemProps = {
  id: string;
  name: string;
  price: number;
  imageId: string;
  salerName: string;
};

export const PurchasedItem = ({ id, name, price, imageId, salerName }: ItemProps) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(1);
  const router = useRouter();
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

  const onPurchase = (itemId: string, count: number) => {
    if (window.localStorage) {
      const defaultItemsJson = localStorage.getItem('purchasedItems');
      const defaultItems = defaultItemsJson == null ? [] : JSON.parse(defaultItemsJson);
      const purchasedItems = [...defaultItems, { id: itemId, count: count }];
      let purchasedItemsJson = JSON.stringify(purchasedItems, undefined, 1);
      localStorage.setItem('purchasedItems', purchasedItemsJson);
    }
  };

  const onModalClose = () => {
    setCount(1);
    setIsOpen(false);
  };

  return (
    <>
      <StyledModal isOpen={modalIsOpen} onRequestClose={() => onModalClose()} style={modalStyle}>
        <ModalWrapper>
          <ModalCloseButton onClick={() => setIsOpen(false)}>
            <X />
          </ModalCloseButton>
          <ModalLeft>
            <ModalImage src={url} />
          </ModalLeft>
          <ModalRight>
            <ModalItemName>{name}</ModalItemName>
            <SalerWrapper>
              <ModalSeller onClick={() => router.push(`/list/${salerName}`)}>
                {salerName}
              </ModalSeller>
            </SalerWrapper>
            <ModalItemPrice>{price * count}</ModalItemPrice>
            <BuyButtonWrapper>
              <Count count={count} onChange={setCount} />
              <StyledButton text='カートに入れる' onClick={() => onPurchase(id, count)} />
            </BuyButtonWrapper>
          </ModalRight>
        </ModalWrapper>
      </StyledModal>
      <Wrapper onClick={() => setIsOpen(true)}>
        <StyledImage src={url} />
        <ItemInfo>
          <Text>{name}</Text>
          <Price>{price}</Price>
        </ItemInfo>
        <DeleteButton onClick={() => console.log('Delete')}>
          <X />
        </DeleteButton>
      </Wrapper>
    </>
  );
};
