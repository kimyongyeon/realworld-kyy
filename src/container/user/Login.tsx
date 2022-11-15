import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosService from '../../common/AxiosService';
import BE_API from '../../common/beApi';
import User from './domain/User';

export const Login = () => {
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [isLoginFail, setLoginFail] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = new User();
    if (user.isLogin()) {
      navigate('/', { replace: true });
    }

    setId('test1818@naver.com');
    setPass('1111');
  }, []);

  const login = (e: any) => {
    e.preventDefault();
    const user = new User({ email: id, password: pass });
    // test1818@naver.com  / 1111
    axiosService
      .post(BE_API.POST_LOGIN, user.createloginForm())
      .then((response: any) => {
        user.setLoginInfo(response.data);
        setLoginFail(false);
        // navigate('/', { replace: true });
        location.replace('/'); // 페이지를 다시 최초 그려야 메뉴가 나옴
      })
      .catch((e) => {
        console.error(e);
        setLoginFail(true);
      });
  };

  const isLoginCheck = () => {
    if (!isLoginFail) {
      return '';
    } else {
      return (
        <>
          <ul className="error-messages">
            <li>That email is already taken</li>
          </ul>
        </>
      );
    }
  };

  return (
    <>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Login</h1>
              <p className="text-xs-center">
                <a href="/register">Need an account?</a>
              </p>

              {isLoginCheck()}

              <form>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      &nbsp; 아이디 기억
                    </label>
                  </div>
                </fieldset>

                <button onClick={login} className="btn btn-lg btn-primary pull-xs-right">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
