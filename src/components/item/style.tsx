import ReactModal from 'react-modal';
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

export const StyledModal = styled(ReactModal)`
  display: flex;
`;

export const modalStyle: ReactModal.Styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  content: {
    position: 'absolute',
    top: '5rem',
    left: '5rem',
    right: '5rem',
    bottom: '5rem',
    backgroundColor: 'white',
    borderRadius: '1rem',
    padding: '1.5rem',
  },
};

export const ModalWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
`;

export const ModalCloseButton = styled(ButtonWrapper)`
  top: 12px;
  right: 12px; ;
`;

export const ModalLeft = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 50px;
`;

export const ModalImage = styled.img`
  width: 100%;
`;

export const ModalRight = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ModalItemName = styled.p`
  width: 100%;
  margin: 8px;
  font-size: 36px;
`;

export const ModalSeller = styled.p`
  width: 100%;
  margin: 8px;
  padding: 8px;
  border-bottom: 2px solid gray;
  color: skyblue;

  &::before {
    content: '出品者：';
    margin-right: 12px;
  }
`;

export const ModalItemPrice = styled.p`
  width: 100%;
  font-size: 26px;
  margin: 8px;
  text-align: end;

  &::before {
    content: '¥';
    font-size: 16px;
    margin-right: 8px;
  }
`;
