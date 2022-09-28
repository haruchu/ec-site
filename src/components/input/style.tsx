import styled from "styled-components";
import { phone } from "../../valiables/BreakPoint";

export const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 24px;
  ${phone`
    font-size:16px;
  `}
  border: none;
  border-radius: 12px;
  background: #e8d7f4;
  box-shadow: inset 8px 8px 16px #ccbdd7, inset -8px -8px 16px #fff1ff;

  &:focus {
    outline: none;
  }
`;