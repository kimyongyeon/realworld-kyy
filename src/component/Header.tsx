import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import commonLog from '../common/LoggingService';
import User, { UserInfo } from '../container/user/domain/User';

const Header = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = new User();
    setIsLoggedIn(user.isLogin());
    // commonLog.info(user.getToken());
  }, []);

  const logout = () => {
    const user = new User();
    user.logout();
    commonLog.info('logout clear', user.isLogin());
    navigate('/login', { replace: true });
  };

  const Login = () => {
    if (isLoggedIn) {
      return (
        <li className="nav-item">
          <a className="nav-link" href="#" onClick={logout}>
            logout
          </a>
        </li>
      );
    } else {
      return (
        <li className="nav-item">
          <a className="nav-link" href="/login">
            login
          </a>
        </li>
      );
    }
  };

  const UserInfo = () => {
    const [userInfo, setUserInfo] = useState<UserInfo>();
    useEffect(() => {
      const user = new User();
      setUserInfo(user.getUserInfo());
    }, []);

    if (isLoggedIn) {
      return (
        <li className="nav-item">
          <a className="nav-link" href="/profile">
            {userInfo?.username}
          </a>
        </li>
      );
    } else {
      return '';
    }
  };

  const SignUp = () => {
    if (isLoggedIn) {
      return '';
    } else {
      return (
        <li className="nav-item">
          <a className="nav-link" href="/register">
            Sign up
          </a>
        </li>
      );
    }
  };

  const Setting = () => {
    if (isLoggedIn) {
      return (
        <li className="nav-item">
          <a className="nav-link" href="/settings">
            <i className="ion-gear-a"></i>&nbsp;Settings
          </a>
        </li>
      );
    } else {
      return '';
    }
  };

  //image를 import하는 대신 require(path)를 통해 변수에 저장해준다.

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <a className="nav-link active" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/article">
              <i className="ion-compose"></i>&nbsp;New Article
            </a>
          </li>

          {Login()}
          {/* {SignUp()} */}
          {Setting()}
          {UserInfo()}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
