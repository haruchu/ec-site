import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { LogOut, ShoppingCart, User } from 'react-feather';
import { Menu } from '../components/molecules/menu';
import { useAuthDispatchUserContext } from '../contexts/AuthContextProvider';

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

export const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const { signout } = useAuthDispatchUserContext();

  const menu = [
    {
      icon: <LogOut />,
      func: () => signout(),
    },
    {
      icon: <ShoppingCart />,
      func: () => router.push(`/purchase`),
    },
    {
      icon: <User />,
      func: () => console.log('profile'),
    },
  ];
  return (
    <>
      {children}
      <Menu menu={menu} />
    </>
  );
};
