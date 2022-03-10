import type { NextPage } from 'next'
import Head from 'next/head'
 import SignIn from './signin';
import SignUp from './signup';
import ForgotPwd from './forgot';
const Home: NextPage = () => {
  return (
            <SignIn />    
          )
}

export default Home;
