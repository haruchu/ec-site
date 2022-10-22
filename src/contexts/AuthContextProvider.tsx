import React, { ReactNode, useEffect, useState } from "react";

type AuthInfo = {
  userId: string;
};

// ログイン状態のContext
export const LoggedInContext = React.createContext<boolean>(false);

export const AuthInfoContext = React.createContext<
  [AuthInfo, React.Dispatch<React.SetStateAction<AuthInfo>>]
  >([{ userId: "" }, () => { }]);

  /**
 * デフォルトのAuthInfoを取得
 * ローカルストレージから取得できた場合はその値をパース
 * 取得できない場合は空の情報を返す
 */
function getDefaultAuthInfo(): AuthInfo {
  if (typeof window !== "undefined") {
    const defaultAuthInfo = window.localStorage.getItem("authInfo");
    if (defaultAuthInfo) {
      return JSON.parse(defaultAuthInfo) as AuthInfo;
    } else {
      return { userId: "" };
    }
  }
}

/**
 * 認証情報をローカルストレージに追加
 */
function setAutoInfoToLocalStorage(authInfo: AuthInfo): void {
  const authInfoStringfy = JSON.stringify(authInfo);
  window.localStorage.setItem("authInfo", authInfoStringfy);
}

export const AuthContextProvider: React.FC<{children: ReactNode}> = (props) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [authInfo, setAuthInfo] = useState<AuthInfo>(getDefaultAuthInfo());

  useEffect(() => {
    if (authInfo?.userId) {
      setAutoInfoToLocalStorage(authInfo);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [authInfo]);
  return (
    <LoggedInContext.Provider value={loggedIn}>
      <AuthInfoContext.Provider value={[authInfo, setAuthInfo]}>
        {props.children}
      </AuthInfoContext.Provider>
    </LoggedInContext.Provider>
  );
};