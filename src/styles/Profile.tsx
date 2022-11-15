import styled from 'styled-components';
import { phone } from '../valiables/BreakPoint';
import { Wrapper } from './Share';

export const ProfileWrapper = styled(Wrapper)`
  padding-top: 50px;
  justify-content: flex-start;
`;

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const UserName = styled.h1`
  padding: 10px 20px;
  border-radius: 12px;
  ${phone`
    font-size: 24px;
  `}
  background: #e8d7f4;
  box-shadow: inset 6px 6px 12px #b5a8be, inset -6px -6px 12px #ffffff;
  &::after {
    content: 'のプロフィール';
    font-size: 20px;
    ${phone`
      font-size: 16px;
    `}
    margin-left: 8px;
  }
`;

export const Point = styled.span`
  font-weight: 700;
  padding: 12px;
  border-radius: 16px;
  background: #e8d7f4;
  box-shadow: inset 5px 5px 8px #ccbdd7, inset -5px -5px 8px #fff1ff;
  &::before {
    content: '所持ポイント';
    margin-right: 8px;
  }
  &::after {
    content: 'pt';
    margin-left: 4px;
  }
`;

export const SalerName = styled.h2`
  ${phone`
    font-size: 16px;
  `}
`;
