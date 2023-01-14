import styled from 'styled-components';
import { phone } from '../../../valiables/BreakPoint';

export const Wrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 80%;
  padding: 20px;
  background: #e8d7f4;
  box-shadow: 6px 6px 12px #d1c2dc, -6px -6px 12px #ffedff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  border-radius: 16px;
  ${phone`
    width: 100%;
    padding: 10px;
  `}
`;

export const StyledImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px,
    rgba(0, 0, 0, 0.09) 0px -3px 5px;

  ${phone`
    width: 50px;
    height: 50px;
  `}
`;

export const ItemInfo = styled.span`
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
`;

export const Text = styled.span`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 20px;
  ${phone`
    font-size: 16px;
  `}
`;

export const RightParts = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Price = styled.span`
  font-size: 28px;
  ${phone`
    font-size: 20px;
  `}
  &:after {
    margin-left: 4px;
    content: 'pt';
    font-size: 24px;
    ${phone`
    font-size: 16px;
  `}
  }
`;

export const Count = styled.span`
  font-size: 20px;
  ${phone`
    font-size: 12px;
  `}

  &:before {
    content: '×';
    margin-right: 4px;
  }
`;

export const DeleteButton = styled.button`
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

  & svg {
    width: 16px;
    height: 16px;
  }
`;
