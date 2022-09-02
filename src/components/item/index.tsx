import { useState } from 'react';
import { ShoppingCart, Maximize2, X } from 'react-feather';

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
} from './style';
type ItemProps = {
  name: string;
  price: number;
  imagePath: string;
};

export const Item = ({ name, price, imagePath }: ItemProps) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <>
      <StyledModal isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)} style={modalStyle}>
        <ModalWrapper>
          <ModalCloseButton onClick={() => setIsOpen(false)}>
            <X />
          </ModalCloseButton>
          <ModalLeft>
            <ModalImage src={imagePath} />
          </ModalLeft>
          <ModalRight>
            <ModalItemName>{name}</ModalItemName>
            <ModalSeller>hogehoge林業</ModalSeller>
            <ModalItemPrice>{price}</ModalItemPrice>
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
          <StyledImage src={imagePath} />
        </StyledImageButton>
        <ItemInfo>
          <StyledName>{name}</StyledName>
          <StyledPrice>{price}</StyledPrice>
        </ItemInfo>
      </Wrapper>
    </>
  );
};
