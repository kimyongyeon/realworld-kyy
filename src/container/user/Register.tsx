import React, { useState } from 'react';
import axiosService from '../../common/AxiosService';
import BE_API from '../../common/beApi';
import commonLog from '../../common/LoggingService';
import User from './domain/User';

export const Register = () => {
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  const register = (e: any) => {
    e.preventDefault();
    const user = new User({ email: id, password: pass, username: name });
    // bio: null;
    // email: 'test1818@naver.com';
    // image: 'https://api.realworld.io/images/smiley-cyrus.jpeg';
    // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxODE4QG5hdmVyLmNvbSIsInVzZXJuYW1lIjoi7YWM7Iqk7Yq46rOE7KCVIiwiaWF0IjoxNjY4MjYxMTIzLCJleHAiOjE2NzM0NDUxMjN9.ncQqdGST1gGpb0nD5mNEr7fdgpXrm8G7U2MlVNbXrLY';
    // username: '테스트계정';
    axiosService.post(BE_API.POST_REGISTER, user.createSignupForm()).then((r) => commonLog.info(r));
  };

  return (
    <>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign up</h1>
              <p className="text-xs-center">
                <a href="/login">Have an account?</a>
              </p>

              <ul className="error-messages">
                <li>That email is already taken</li>
              </ul>

              <form>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </fieldset>
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
                <button onClick={register} className="btn btn-lg btn-primary pull-xs-right">
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
