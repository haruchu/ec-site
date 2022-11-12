import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
import { phone, tablet } from '../valiables/BreakPoint';

export const StyledInfiniteScroll = styled(InfiniteScroll)`
  /* min-height: 100vh; */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 80px;
  ${tablet`
    gap: 60px;
  `}
  ${phone`
    gap: 40px;
  `}
  margin: 40px 20px;
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
  background: #e8d7f4;
  box-shadow: inset 6px 6px 12px #b5a8be, inset -6px -6px 12px #ffffff;
  &::after {
    content: 'のプロフィール';
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
export const SalerName = styled.h2``;
