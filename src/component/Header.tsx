import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import commonLog from '../common/LoggingService';
import User, { UserInfo } from '../container/user/domain/User';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const user = new User();
    setIsLoggedIn(user.isLogin());
    // commonLog.info(user.getToken());
  }, []);

  const logout = () => {
    const r = confirm('정말로 로그아웃 하시겠습니까?');
    if (r) {
      const user = new User();
      user.logout();
      setIsLoggedIn(false);
      commonLog.info('logout clear', user.isLogin());
      navigate('/', { replace: true });
    }
  };

  const Login = () => {
    if (isLoggedIn) {
      return (
        <>
          <Nav.Link as={Link} to="/login" onClick={logout}>
            로그아웃
          </Nav.Link>
        </>
      );
    } else {
      return (
        <>
          <Nav.Link as={Link} to="/login">
            로그인
          </Nav.Link>
        </>
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
        <>
          <Nav.Link as={Link} to="/profile">
            {userInfo?.username}
          </Nav.Link>
        </>
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
        <>
          <Nav.Link as={Link} to="/register">
            회원가입
          </Nav.Link>
        </>
      );
    }
  };

  const Setting = () => {
    if (isLoggedIn) {
      return (
        <>
          <Nav.Link as={Link} to="/settings">
            프로필수정
          </Nav.Link>
        </>
      );
    } else {
      return '';
    }
  };

  const Article = () => {
    if (isLoggedIn) {
      return (
        <Nav.Link as={Link} to="/article/detail">
          게시판글쓰기
        </Nav.Link>
      );
    }
  };

  const TopMenu = () => {
    return (
      <>
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand as={Link} to="/">
              콘두잇
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                홈으로
              </Nav.Link>
              {Article()}
              {/* {SignUp()} */}
              {Setting()}
              {UserInfo()}
              {Login()}
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  };

  return <>{TopMenu()}</>;
};

export default Header;
