import { useRouter } from 'next/router';
import React, { ReactNode, useState } from 'react';
import { Wrapper, Toggle, MenuList, MenuLists, Line, Icon } from './style';

type MenuItemType = {
  icon: ReactNode;
  link: string;
};
type Menuprops = {
  menu: MenuItemType[];
};

export const Menu = ({ menu }: Menuprops) => {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  return (
    <Wrapper>
      <MenuLists>
        <Toggle isActive={isActive} onClick={() => setIsActive(!isActive)}>
          <Line></Line>
          <Line></Line>
          <Line></Line>
        </Toggle>
        {menu.map((item, index) => {
          return (
            <MenuList
              key={index}
              index={index}
              isActive={isActive}
              onClick={() => router.push(`/${item.link}`)}
            >
              <Icon index={index}>{item.icon}</Icon>
            </MenuList>
          );
        })}
      </MenuLists>
    </Wrapper>
  );
};
