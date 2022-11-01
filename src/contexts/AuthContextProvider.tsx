import { useRouter } from 'next/router';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type Auth = {
  isLogined: boolean;
};

type AuthDispatcher = {
  setAuth: Dispatch<SetStateAction<Auth>>;
  signin: (id: string, name: string, password: string) => void;
  signout: () => void;
};

const LoggedInContext = React.createContext<boolean>({} as boolean);

export const useLoggedInContext = () => {
  return useContext<boolean>(LoggedInContext);
};

const AuthDispatchUserContext = createContext<AuthDispatcher>({} as AuthDispatcher);

export const useAuthDispatchUserContext = () => {
  return useContext<AuthDispatcher>(AuthDispatchUserContext);
};

type Props = {
  children: ReactNode;
};

export const AuthContextProvider: React.FC<{ children: ReactNode }> = (props) => {
  const router = useRouter();
  const getDefaultAuth = (): Auth => {
    let isLogined = false;
    if (typeof window !== 'undefined') {
      const userIdToken = localStorage.getItem('userId');
      isLogined = userIdToken !== null;
    }
    return {
      isLogined: isLogined,
    };
  };
  const [auth, setAuth] = useState<Auth>(getDefaultAuth());

  const signin = async (id: string, name: string, password: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userId', id);
    }
    setAuth({ isLogined: true });
    router.push('/');
  };

  const signout = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userId');
    }
    setAuth({ isLogined: false });
    router.push('/login');
  };

  const dispatchValue: AuthDispatcher = { setAuth, signin, signout };

  return (
    <LoggedInContext.Provider value={auth.isLogined}>
      <AuthDispatchUserContext.Provider value={dispatchValue}>
        {props.children}
      </AuthDispatchUserContext.Provider>
    </LoggedInContext.Provider>
  );
};
