import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: linear-gradient(90deg, rgba(65, 164, 253, 1), rgba(14, 244, 255, 1));
`;

export const MenuLists = styled.ul`
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  background-color: #fff;
  border: none;
  border-radius: 50%;
  z-index: 99;
  transform: translateX(-40px);
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
  position: absolute;
  left: 0;
  list-style: none;
  transform-origin: 100px;
  transition: 0.5s;
  transition-delay: ${(index) => `calc(0.1s * var(${index}))`};
  transform: ${({ isActive, index }) =>
    isActive ? `rotate(calc(360deg / 8 * ${index}))` : `rotate(0) translateX(80px)`};
`;

export const Icon = styled.span<{ index: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  transform: ${({ index }) => `rotate(calc(360deg / -8 * ${index}))`};
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
  color: #000;
  transition: 0.5s;
  cursor: pointer;
`;
