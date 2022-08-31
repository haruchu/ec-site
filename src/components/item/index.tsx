import { ShoppingCart, Maximize2 } from 'react-feather';
import {
  CartButton,
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
  imagePath: string;
};

export const Item = ({ name, price, imagePath }: ItemProps) => {
  return (
    <Wrapper>
      <MaximizeButton onClick={() => console.log('maximize!')}>
        <Maximize2 />
      </MaximizeButton>
      <CartButton onClick={() => console.log('cart in!')}>
        <ShoppingCart />
      </CartButton>
      <StyledImageButton onClick={() => console.log('maximize!')}>
        <StyledImage src={imagePath} />
      </StyledImageButton>
      <ItemInfo>
        <StyledName>{name}</StyledName>
        <StyledPrice>{price}</StyledPrice>
      </ItemInfo>
    </Wrapper>
  );
};
