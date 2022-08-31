import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: 300px;
  height: 350px;
  background-color: white;
  box-shadow: -5px -5px 10px 0px rgba(255, 255, 255, 0.5), 5px 5px 10px 0px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  border-radius: 16px;
`;
export const ButtonWrapper = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background: transparent;
  border: 2px dotted gray;
  &:hover {
    border: 2px solid gray;
  }
  border-radius: 50%;
  position: absolute;

  & svg {
    width: 16px;
    height: 16px;
  }
`;

export const CartButton = styled(ButtonWrapper)`
  top: 14px;
  right: 14px;
`;

export const MaximizeButton = styled(ButtonWrapper)`
  top: 14px;
  left: 14px;
`;

export const StyledImageButton = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 16px;
  padding: 0;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px,
    rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px,
    rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

export const StyledImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

export const ItemInfo = styled.div`
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
`;

export const StyledName = styled.p`
  text-align: center;
  font-size: 16px;
  margin: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledPrice = styled.p`
  text-align: center;
  font-size: 14px;
  margin: 4px;
  color: gray;
`;
