import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { LogOut, ShoppingCart, User } from 'react-feather';
import { Menu } from '../components/molecules/menu';
import { useAuthDispatchUserContext } from '../contexts/AuthContextProvider';

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

export const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const { signout } = useAuthDispatchUserContext();
  const name = localStorage.getItem('userName');
  const menu = [
    {
      icon: <LogOut />,
      func: () => signout(),
    },
    {
      icon: <ShoppingCart />,
      func: () => router.push('/purchase'),
    },
    {
      icon: <User />,
      func: () => router.push(`/profile/${name}`),
    },
  ];
  return (
    <>
      {children}
      <Menu menu={menu} />
    </>
  );
};
