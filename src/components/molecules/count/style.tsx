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
  box-shadow: 10px 10px 20px #c8b9d2, -10px -10px 20px #fff5ff;
  &:hover {
    box-shadow: 5px 5px 10px #c8b9d2, -5px -5px 10px #fff5ff;
  }

  & span {
    width: 24px;
    height: 24px;
  }
`;
