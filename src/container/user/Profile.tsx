import { useEffect, useState } from 'react';
import axiosService from '../../common/AxiosService';
import BE_API from '../../common/beApi';
import commonLog from '../../common/LoggingService';
import { ArticlePreview } from './component/profile/ArticlePreview';
import { ArticlesToggle } from './component/profile/ArticlesToggle';
import { UserInfoCard } from './component/profile/UserInfoCard';
import User, { UserInfo } from './domain/User';

export const Profile = () => {
  // https://pinokio0702.tistory.com/365
  // props에 넘겨주고 받을때... 레스트 방식으로 반드시 해야 하는 이유
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: '',
    email: '',
    image: '',
    token: '',
    bio: '',
  });

  const previewList = [
    {
      seq: 1,
      img: 'https://picsum.photos/100/100',
      date: '2022-01-12',
      authorName: '수지',
      authorUrl: 'https://picsum.photos/100/100',
      age: 20,
      title: '이쁘다.',
      summary: '수지는 진짜 이쁘다. 이유는?',
      previewLink: '/detail',
    },
    {
      seq: 2,
      img: 'https://picsum.photos/100/100',
      date: '2022-01-12',
      authorName: '영지',
      authorUrl: 'https://picsum.photos/110/110',
      age: 19,
      title: '못생김.',
      summary: '평생 소원이 수지처럼 사는 것',
      previewLink: '/detail',
    },
    {
      seq: 3,
      img: 'https://picsum.photos/100/100',
      date: '2022-01-12',
      authorName: '영자',
      authorUrl: 'https://picsum.photos/120/120',
      age: 11,
      title: '돼지다.',
      summary: '살빼는건 거의 포기다.',
      previewLink: '/detail',
    },
  ];

  // 이건 컴포넌트로 왜 안만들어 지는가?
  const getPreviewList = (list: typeof previewList) => {
    return (
      <>
        {list.map((p) => (
          <ArticlePreview key={p.seq} {...p} />
        ))}
        ;
      </>
    );
  };

  useEffect(() => {
    const user = new User();
    setUserInfo(user.getUserInfo());
    axiosService
      .get(BE_API.GET_CURRENT_USER)
      .then((response: any) => commonLog.info(response.username));
    axiosService
      .get(BE_API.GET_PROFILE(user.getUserInfo().username || ''))
      .then((response) => commonLog.info(response));
  }, []);
  return (
    <>
      <div className="profile-page">
        <UserInfoCard {...userInfo} />
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <ArticlesToggle />
              {getPreviewList(previewList)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
