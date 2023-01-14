import styled from 'styled-components';

export const MenuLists = styled.ul<{ isActive: boolean }>`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  right: 0;
  transition: 0.5s;
  transform: ${({ isActive }) => (isActive ? `translate(-20px, 50px)` : `translate(40px, 50px)`)};
`;

export const Line = styled.div`
  width: 50%;
  height: 2px;
  margin: 0 auto;
  border-radius: 12px;
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
  background-color: #000;
`;

export const Toggle = styled.button<{ isActive: boolean }>`
  width: 60px;
  height: 60px;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  cursor: pointer;
  transition: 0.5s;
  border: none;
  border-radius: 50%;
  z-index: 99;
  transform: translateX(-20px);
  background: linear-gradient(145deg, #f8e6ff, #d1c2dc);
  box-shadow: 5px 5px 10px #ccbdd7, -5px -5px 10px #fff1ff;
  ${Line} {
    :first-child {
      transform: ${({ isActive }) => (isActive ? `translateY(7px) rotate(-45deg)` : 'rotate(0)')};
    }
    :nth-child(2) {
      margin: 6px auto;
      opacity: ${({ isActive }) => (isActive ? '0' : '1')};
    }
    :last-child {
      transform: ${({ isActive }) => (isActive ? `translateY(-10px) rotate(45deg)` : 'rotate(0)')};
    }
  }
`;

export const MenuList = styled.li<{ index: number; isActive: boolean }>`
  cursor: pointer;
  position: absolute;
  left: 0;
  list-style: none;
  transform-origin: 100px;
  transition: 0.2s;
  transition-delay: ${(index) => `calc(0.1s * var(${index}))`};
  transform: ${({ isActive, index }) =>
    isActive ? `rotate(calc(360deg / 8 * (${index}-1)))` : `rotate(0) translateX(80px)`};
  &:hover {
    opacity: 0.5;
  }
`;

export const Icon = styled.span<{ index: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(145deg, #f8e6ff, #d1c2dc);
  box-shadow: 4px 4px 8px #d1c2dc, -4px -4px 8px #ffedff;
  transform: ${({ index }) => `rotate(calc(360deg / -8 * ${index}))`};
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
  color: #000;
`;
