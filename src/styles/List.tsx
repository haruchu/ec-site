import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
import { phone, tablet } from '../valiables/BreakPoint';
import { COLOR } from '../valiables/Color';

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

export const SalerName = styled.h2`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
`;
