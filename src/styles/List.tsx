import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
import { phone, tablet } from '../valiables/BreakPoint';

export const StyledInfiniteScroll = styled(InfiniteScroll)`
  /* min-height: 100vh; */
  width: 100%;
  display: flex;
  justify-content: center;
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

export const TotalPoint = styled.p`
  display: flex;
  justify-content: flex-end;
  width: 70%;
`;

export const TotalPointText = styled.span`
  font-size: 28px;
  ${phone`
    font-size: 20px;
  `}
  &:before {
    content: '合計';
    margin-right: 12px;
  }
  &:after {
    margin-left: 4px;
    content: 'pt';
    font-size: 24px;
    ${phone`
    font-size: 16px;
  `}
  }
`;
