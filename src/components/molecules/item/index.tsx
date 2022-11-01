import { getDownloadURL, ref } from 'firebase/storage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ShoppingCart, Maximize2, X } from 'react-feather';
import { storage } from '../../../../firebase/firebase';
import { Button } from '../button';

import {
  CartButton,
  ItemInfo,
  MaximizeButton,
  modalStyle,
  StyledModal,
  StyledImage,
  StyledImageButton,
  StyledName,
  StyledPrice,
  Wrapper,
  ModalLeft,
  ModalRight,
  ModalImage,
  ModalItemName,
  ModalItemPrice,
  ModalSeller,
  ModalWrapper,
  ModalCloseButton,
  BuyButtonWrapper,
} from './style';
type ItemProps = {
  id: string;
  name: string;
  price: number;
  imageId: string;
  salerName: string;
};

export const Item = ({ id, name, price, imageId, salerName }: ItemProps) => {
  const [modalIsOpen, setIsOpen] = useState(false);
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
    count = 1;
    if (window.localStorage) {
      const defaultItemsJson = localStorage.getItem('purchasedItems');
      const defaultItems = (defaultItemsJson == null) ? [] : JSON.parse(defaultItemsJson)
      const purchasedItems = [...defaultItems, {id: itemId, count: count}];
      let purchasedItemsJson = JSON.stringify(purchasedItems, undefined, 1);
    localStorage.setItem('purchasedItems', purchasedItemsJson);
    }
  }

  return (
    <>
      <StyledModal isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)} style={modalStyle}>
        <ModalWrapper>
          <ModalCloseButton onClick={() => setIsOpen(false)}>
            <X />
          </ModalCloseButton>
          <ModalLeft>
            <ModalImage src={url} />
          </ModalLeft>
          <ModalRight>
            <ModalItemName>{name}</ModalItemName>
            <ModalSeller onClick={() => router.push(`/list/${salerName}`)}>{salerName}</ModalSeller>
            <ModalItemPrice>{price}</ModalItemPrice>
            <BuyButtonWrapper>
              <Button
                text="購入"
                onClick={() => onPurchase(id)}
              />
            </BuyButtonWrapper>
          </ModalRight>
        </ModalWrapper>
      </StyledModal>
      <Wrapper>
        <MaximizeButton onClick={() => setIsOpen(true)}>
          <Maximize2 />
        </MaximizeButton>
        <CartButton onClick={() => onPurchase(id)}>
          <ShoppingCart />
        </CartButton>
        <StyledImageButton onClick={() => setIsOpen(true)}>
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
