import Link from 'next/link';
import Image from 'next/image';
import mainLogo from 'Images/logo-login.png';

const ResetMessage = () => {
  return (
    <div className="main-section">
      <div className="app-forgot">
        <div className="bg-forgot"></div>
        <div className="login-form">
          <form>
            <header>
              <Image
                src={mainLogo}
                alt="loginImage"
                width="120px"
                height="70px"
              />
            </header>
            <div className="inputs">
              <div>
                <h3 className="text-white">Reset Password</h3>
                <br />
                <p className="reset-message">
                  Dear user, Reset Password Link Has Been Sent To Your
                  Registered Email Address Successfully
                </p>
              </div>
            </div>
          </form>
        </div>
        <footer>
          <div className="reset-login">
            <Link href="/">Login</Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ResetMessage;
