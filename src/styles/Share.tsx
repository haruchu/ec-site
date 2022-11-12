import styled from 'styled-components';
import { phone } from '../valiables/BreakPoint';
import { COLOR } from '../valiables/Color';

export const Wrapper = styled.div`
  min-height: 100vh;
  padding: 50px;
  ${phone`
    padding: 10px;
  `}
  background-color: ${COLOR.main};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
