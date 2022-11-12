import React, { ReactNode, useState } from 'react';
import { Toggle, MenuList, MenuLists, Line, Icon } from './style';

type MenuItemType = {
  icon: ReactNode;
  func: () => void;
};
type Menuprops = {
  menu: MenuItemType[];
};

export const Menu = ({ menu }: Menuprops) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <MenuLists>
      <Toggle isActive={isActive} onClick={() => setIsActive(!isActive)}>
        <Line></Line>
        <Line></Line>
        <Line></Line>
      </Toggle>
      {menu.map((item, index) => {
        return (
          <MenuList key={index} index={index} isActive={isActive} onClick={item.func}>
            <Icon index={index}>{item.icon}</Icon>
          </MenuList>
        );
      })}
    </MenuLists>
  );
};
