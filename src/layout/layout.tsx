import { Router, useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { LogOut, ShoppingCart, User } from 'react-feather';
import { Menu } from '../components/molecules/menu';
import { useAuthDispatchUserContext } from '../contexts/AuthContextProvider';

type LayoutProps = Required<{
  readonly children: ReactElement;
  currentRouter: Router;
}>;

export const Layout = ({ children, currentRouter }: LayoutProps) => {
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
      {currentRouter.pathname !== '/login' && currentRouter.pathname !== '/signup' && (
        <Menu menu={menu} />
      )}
    </>
  );
};
