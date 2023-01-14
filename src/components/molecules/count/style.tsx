import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CountContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
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
  border: none;
  background: linear-gradient(145deg, #f8e6ff, #d1c2dc);
  box-shadow: 2px 2px 4px #d1c2dc, -2px -2px 4px #ffedff;
  &:hover {
    background: #e8d7f4;
    box-shadow: inset 2px 2px 4px #d1c2dc, inset -2px -2px 4px #ffedff;
  }

  & span {
    width: 24px;
    height: 24px;
  }
`;
