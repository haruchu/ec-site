import styled from 'styled-components';
import { phone } from '../../../valiables/BreakPoint';

export const StyledButton = styled.button`
  cursor: pointer;
  ${phone`
    width: fit-content;
  `}
  padding: 20px 40px;
  outline: none;
  border: none;
  border-radius: 50px;
  background: linear-gradient(145deg, #f8e6ff, #d1c2dc);
  box-shadow: 10px 10px 20px #c8b9d2, -10px -10px 20px #fff5ff;
  &:hover {
    box-shadow: 5px 5px 10px #c8b9d2, -5px -5px 10px #fff5ff;
  }
`;
