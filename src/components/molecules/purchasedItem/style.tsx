import ReactModal from 'react-modal';
import styled from 'styled-components';
import { phone, tablet } from '../../../valiables/BreakPoint';
import { COLOR } from '../../../valiables/Color';
import { Button } from '../button';
import { ButtonWrapper } from '../item/style';

export const Wrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 70%;
  height: 150px;
  padding: 20px 80px 20px 20px;
  background: #e8d7f4;
  box-shadow: 9px 9px 18px #cabbd4, -9px -9px 18px #fff3ff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  border-radius: 16px;
  cursor: pointer;
`;

export const StyledImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 16px;

  box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px,
    rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

export const ItemInfo = styled.span`
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: space-between;
`;

export const Text = styled.span`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 20px;
`;

export const Price = styled.span`
  font-size: 28px;
`;

export const DeleteButton = styled(ButtonWrapper)`
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
`;
