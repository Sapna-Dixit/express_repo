import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rsuite/dist/rsuite.min.css';
import Layout from './layout';
import { wrapper, persistor, RootState } from '../redux/store';
import '../../styles/core.css';
import '../../styles/globals.css';
import '../components/Login/Login.css';
import '../components/Layout/Header/Header.css';
import 'animate.css';
import 'react-quill/dist/quill.snow.css';
// import { AnyAction } from 'redux';
import { useSelector } from 'react-redux';
// import { login, resetLogin } from 'redux/reducer/Login';

function MyApp({ Component, pageProps, router }: AppProps) {
  // const dispatch = useDispatch();
  const router1 = useRouter();
  const pathToBlock = [
    '/',
    '/forgot/password',
    '/forgot/reset-message',
    '/resetpassword',
    '/_error',
    '/login',
    '/user/set-password',
  ];
  const [mount, setMount] = useState(false);
  const [disable, setDisable] = useState(true);
  const token = useSelector((state: RootState) => state?.login?.loginData);

  const checkPath = pathToBlock?.filter((data) => data === router1.pathname);

  const routeChange = () => {
    router1.events.on('routeChangeComplete', () => setDisable(false));
  };

  const reduxData =
    typeof window !== 'undefined' && localStorage.getItem('persist:root');

  useEffect(() => {
    if (reduxData !== null && token && token?.length > 0) {
      if (router1.pathname === `${checkPath}` && reduxData !== null) {
        reduxData !== null && routeChange();
        reduxData !== null && router1.push('/dashboard');
      } else {
        setDisable(false);
      }
    } else {
      routeChange();
      router1.push(
        `${router1.pathname === `${checkPath}` ? router1.pathname : '/'}`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router1.pathname, token]);

  useEffect(() => {
    setMount(true);
  }, []);

  // const hours = 12;
  // const now: string | number = new Date().getTime();
  // const set = () =>
  //   typeof window !== 'undefined'
  //     ? localStorage.setItem('setupTime', now as unknown as string)
  //     : null;
  // const setupTime =
  //   typeof window !== 'undefined' ? localStorage.getItem('setupTime') : null;
  // if (setupTime === null) {
  //   set();
  // } else {
  //   if (now - Number(setupTime) > hours * 60 * 60 * 1000) {
  //     localStorage.clear();
  //     dispatch(login(''));
  //     dispatch(resetLogin() as unknown as AnyAction);
  //     localStorage.clear();
  //     setTimeout(async () => {
  //       (await router1.push('/')) && router1.reload();
  //     }, 1000);
  //     set();
  //   }
  // }
  if (disable) {
    return null;
  } else {
    return (
      <>
        {mount && pathToBlock.includes(router.route) ? (
          <>
            <Toaster position='top-right' />
            <PersistGate loading={null} persistor={persistor}>
              <Component {...pageProps} key={router1.asPath} />
            </PersistGate>
          </>
        ) : (
          <>
            <Toaster position='top-right' />
            <PersistGate loading={null} persistor={persistor}>
              <Layout>
                <Component {...pageProps} key={router1.asPath} />
              </Layout>
            </PersistGate>
          </>
        )}
      </>
    );
  }
}

export default wrapper.withRedux(MyApp);



