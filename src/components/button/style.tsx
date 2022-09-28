import styled from "styled-components";
import { phone } from "../../valiables/BreakPoint";

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
  box-shadow: 8px 8px 16px #ccbdd7, -8px -8px 16px #fff1ff;
`;