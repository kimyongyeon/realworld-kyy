import React from 'react';
import { UserInfo } from '../../domain/User';

export const UserInfoCard = (userInfo: Partial<UserInfo>) => {
  return (
    <>
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img
                src="https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg"
                className="user-img"
              />
              <h4>{userInfo.username}</h4>
              <p>아직 수줍어요~~~</p>
              <button className="btn btn-sm btn-outline-secondary action-btn">
                <i className="ion-plus-round"></i>
                &nbsp; Follow Eric Simons
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
