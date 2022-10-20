import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
import { phone, tablet } from '../valiables/BreakPoint';
import { COLOR } from '../valiables/Color';

export const Wrapper = styled.div`
  min-height: 100vh;
  padding: 50px;
  background-color: ${COLOR.main};
`;

export const StyledInfiniteScroll = styled(InfiniteScroll)`
  min-height: 100vh;
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
