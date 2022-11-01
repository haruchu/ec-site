import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CountContent = styled.span`
  width: 20px;
  height: 20px;
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  background: #e8d7f4;
  box-shadow: inset 5px 5px 10px #baacc3, inset -5px -5px 10px #ffffff;
`;

export const CountButton = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  padding: 20px;
  border-radius: 20px;
  background: #e8d7f4;
  box-shadow: 9px 9px 18px #a297ab, -9px -9px 18px #ffffff;
  border: none;
  &:hover {
    box-shadow: 5px 5px 10px #a297ab, -5px -5px 10px #ffffff;
  }
`;
