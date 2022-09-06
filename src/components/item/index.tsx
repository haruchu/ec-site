import Button from '@material-ui/core/Button';
import { getDownloadURL, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { ShoppingCart, Maximize2, X } from 'react-feather';
import { storage } from '../../../firebase/firebase';

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
  name: string;
  price: number;
  imageId: string;
};

export const Item = ({ name, price, imageId }: ItemProps) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [url, setURL] = useState("");

  useEffect(() => {
    const gsReference = ref(storage, `gs://ec-0831.appspot.com/images/hoge/${imageId}.png`);
    getDownloadURL(gsReference)
      .then((fileURL) => {
        setURL(fileURL);
      })
      .catch((err) => console.log(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            <ModalSeller>hogehoge林業</ModalSeller>
            <ModalItemPrice>{price}</ModalItemPrice>
            <BuyButtonWrapper>
              <Button variant='contained' color='primary' type='submit' onClick={() => console.log('購入')}>
                購入
              </Button>
            </BuyButtonWrapper>
          </ModalRight>
        </ModalWrapper>
      </StyledModal>
      <Wrapper>
        <MaximizeButton onClick={() => setIsOpen(true)}>
          <Maximize2 />
        </MaximizeButton>
        <CartButton onClick={() => console.log('cart in!')}>
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
