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
