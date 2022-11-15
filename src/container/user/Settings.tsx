import { useEffect, useState } from 'react';
import { useStateProxy } from 'use-state-proxy';
import axiosService from '../../common/AxiosService';
import BE_API from '../../common/beApi';
import User from './domain/User';
import ProgressBar from 'react-bootstrap/ProgressBar';
import progressShare from '../../common/ProgressShare';

export const Settings = () => {
  const user = new User();
  const userInfo = useStateProxy(user.initUserInfo());
  const [progress, setProgress] = useState(0);
  const [progressYn, setProgressYn] = useState(false);

  useEffect(() => {
    axiosService.get(BE_API.GET_CURRENT_USER).then((res: any) => {
      user.updateUserInfo(res.data);
      userInfo.image = user.getUserInfo().image;
      userInfo.username = user.getUserInfo().username;
      userInfo.bio = user.getUserInfo().bio;
    });
  }, []);

  const update = (e: any) => {
    e.preventDefault();
    const updateForm = user.updateSignupForm(userInfo);
    setProgressYn(true);
    axiosService
      .put(BE_API.PUT_UPDATE_USER, updateForm)
      .then((res) => {
        progressShare.setValue(0);
        setProgress(0);
        setProgressYn(false);
      })
      .catch((e) => {
        progressShare.setValue(0);
        setProgress(0);
        setProgressYn(false);
        alert(e);
      });
  };
  return (
    <>
      <div className="settings-page">
        {progressYn && <ProgressBar now={progress} label={`${progress}%`} />}
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">프로필 수정</h1>

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
                      value={userInfo?.bio || ''}
                      onChange={(e) => (userInfo.bio = e.target.value)}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Email"
                      value={userInfo?.email}
                      onChange={(e) => (userInfo.email = e.target.value)}
                      disabled
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={userInfo?.password || ''}
                      onChange={(e) => (userInfo.password = e.target.value)}
                      disabled
                    />
                  </fieldset>
                  <button
                    onClick={(e) => update(e)}
                    className="btn btn-lg btn-primary pull-xs-right"
                  >
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
