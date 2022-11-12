import { format } from 'date-fns';
import ja from 'date-fns/locale/ja';
import { getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { db } from '../../firebase/firebase';

type Auth = {
  isLogined: boolean;
};

type AuthDispatcher = {
  setAuth: Dispatch<SetStateAction<Auth>>;
  signin: (name: string, password: string) => void;
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

  const signin = async (name: string, password: string) => {
    const userRef = db.collection('users');
    const userSnap = await userRef
      .where('name', '==', name)
      .where('password', '==', password)
      .get();
    const userInfo = userSnap.docs.map((doc) => ({
      docId: doc.id,
    }));
    if (userInfo.length == 1) {
      const today = format(new Date(), 'yyyy-MM-dd', { locale: ja });

      const userRef = db.collection('users').doc(userInfo[0].docId);
      const userData = await (await getDoc(userRef)).data();
      // 最終ログイン日時を跨いだら更新・ポイントボーナス
      if (userData.login_date && new Date(userData.login_date) < new Date(today)) {
        await userRef.update({ login_date: today, point: userData.point + 100 });
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('userId', userInfo[0].docId);
        localStorage.setItem('userName', userData.name);
      }
      setAuth({ isLogined: true });

      router.push('/');
    } else {
      alert('ログイン情報が間違ってるか、ユーザーが存在しません。');
    }
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
