import { Router, useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { Home, LogOut, ShoppingCart, Upload, User } from 'react-feather';
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
  const publicPaths = ['/', '/signup', '/login'];
  const menu = [
    {
      icon: <Home />,
      func: () => router.push(`/home`),
    },
    {
      icon: <ShoppingCart />,
      func: () => router.push('/purchase'),
    },
    {
      icon: <User />,
      func: () => router.push(`/profile/${name}`),
    },
    {
      icon: <Upload />,
      func: () => router.push(`/upload`),
    },
    {
      icon: <LogOut />,
      func: () => signout(),
    },
  ];
  return (
    <>
      {children}
      {!publicPaths.includes(currentRouter.pathname) && <Menu menu={menu} />}
    </>
  );
};
