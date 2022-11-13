import { useEffect } from 'react';
import { useStateProxy } from 'use-state-proxy';
import User from './domain/User';

export const Settings = () => {
  // const [userInfo, setUserInfo] = useState<UserInfo>();
  const user = new User();
  const userInfo = useStateProxy(user.getUserInfo());
  useEffect(() => {
    // console.log(typeof userData, typeof user.getUserInfo);
    // setUserInfo(user.getUserInfo);
  }, []);

  const update = () => {
    alert(1);
  };
  return (
    <>
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="URL of profile picture"
                      value={userInfo?.image}
                      onChange={(e) => (userInfo.image = e.target.value)}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                      value={userInfo?.username}
                      onChange={(e) => (userInfo.username = e.target.value)}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      placeholder="Short bio about you"
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Email"
                      value={userInfo.email}
                      onChange={(e) => (userInfo.email = e.target.value)}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                    />
                  </fieldset>
                  <button onClick={update} className="btn btn-lg btn-primary pull-xs-right">
                    Update Settings
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
