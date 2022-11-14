import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useLoggedInContext } from './AuthContextProvider';

export { RouteGuard };

function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const isLoggedIn = useLoggedInContext();

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ['/top', '/signup', '/login'];
    const path = url.split('?')[0];

    if (!isLoggedIn && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.replace('/top');
    } else {
      setAuthorized(true);
    }
  }

  return authorized && children;
}
