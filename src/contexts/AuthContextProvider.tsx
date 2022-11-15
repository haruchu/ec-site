import { format } from 'date-fns';
import ja from 'date-fns/locale/ja';
import { addDoc, collection, getDoc } from 'firebase/firestore';
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
  signup: (name: string, password: string) => void;
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

  const signup = async (name: string, password: string) => {
    const userRef = db.collection('users');
    const userSnap = await userRef.where('name', '==', name).get();
    const userInfo = userSnap.docs.map((doc) => ({
      docId: doc.id,
    }));
    if (userInfo.length > 1) {
      alert('同じユーザー名が存在します');
    } else {
      const today = format(new Date(), 'yyyy-MM-dd', { locale: ja });
      const docRef = await addDoc(collection(db, "users"), {
        name: name,
        password: password,
        point: 3000,
        login_date: today,
      });
      console.log(docRef);
      if (typeof window !== 'undefined') {
        localStorage.setItem('userId', docRef.id);
        localStorage.setItem('userName', name);
      }
      setAuth({ isLogined: true });
      router.push('/home');
    }
  };

  const signin = async (name: string, password: string) => {
    const userRef = db.collection('users');
    const userSnap = await userRef
      .where('name', '==', name)
      .get();
    const userInfo = userSnap.docs.map((doc) => ({
      docId: doc.id,
    }));
    console.log(userInfo);
    // if (userInfo.length > 0) {
    //   const today = format(new Date(), 'yyyy-MM-dd', { locale: ja });

    //   const userRef = db.collection('users').doc(userInfo[0].docId);
    //   const userData = await (await getDoc(userRef)).data();
    //   // 最終ログイン日時を跨いだら更新・ポイントボーナス
    //   if (userData.login_date && new Date(userData.login_date) < new Date(today)) {
    //     await userRef.update({ login_date: today, point: userData.point + 100 });
    //   }

    //   if (typeof window !== 'undefined') {
    //     localStorage.setItem('userId', userInfo[0].docId);
    //     localStorage.setItem('userName', userData.name);
    //   }
    //   setAuth({ isLogined: true });

    //   router.push('/home');
    // } else {
    //   alert('ログイン情報が間違ってるか、ユーザーが存在しません。');
    // }
  };

  const signout = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userId');
    }
    setAuth({ isLogined: false });
    router.push('/');
  };

  const dispatchValue: AuthDispatcher = { setAuth, signup, signin, signout };

  return (
    <LoggedInContext.Provider value={auth.isLogined}>
      <AuthDispatchUserContext.Provider value={dispatchValue}>
        {props.children}
      </AuthDispatchUserContext.Provider>
    </LoggedInContext.Provider>
  );
};
