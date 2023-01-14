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
  color: black;
  border-radius: 50px;
  background: linear-gradient(145deg, #f8e6ff, #d1c2dc);
  box-shadow: 11px 11px 22px #cebfd9, -11px -11px 22px #ffefff;
  transition: 1s;
  &:hover {
    background: #e8d7f4;
    box-shadow: inset 11px 11px 22px #cebfd9, inset -11px -11px 22px #ffefff;
  }
`;
