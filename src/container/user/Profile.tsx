import { useEffect, useState } from 'react';
import axiosService from '../../common/AxiosService';
import BE_API from '../../common/beApi';
import commonLog from '../../common/LoggingService';
import { Article } from '../article/domain/Article';
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
  const [toggle, setToggle] = useState('article');
  const [articles, setArticles] = useState([]);
  const [favolist, setFavolist] = useState([]);

  useEffect(() => {
    const user = new User();
    setUserInfo(user.getUserInfo());

    axiosService
      .get(BE_API.GET_CURRENT_USER)
      .then((response: any) => commonLog.info(response.username));

    axiosService
      .get(BE_API.GET_PROFILE(user.getUserInfo().username || ''))
      .then((response) => commonLog.info(response));

    requestArticle();
    requestFeed();
  }, []);

  const respListToViewList = (res: any) => {
    const list = res.data.articles as [];
    let i = 1;
    list.map((item: any) => {
      item.seq = i++;
      return item;
    });
    return list;
  };

  const requestArticle = () => {
    // https://api.realworld.io/api/articles?favorited=%EB%B3%80%EA%B2%BD%EA%B5%BF%EB%A7%A8&limit=5&offset=0
    axiosService
      .get(BE_API.GET_ARTICLES + `?author=${userInfo.username}&limit=5&offset=0`)
      .then((res: any) => {
        const result = respListToViewList(res);
        setArticles([...result]);
      });
  };

  const requestFeed = () => {
    axiosService
      .get(BE_API.GET_ARTICLES + `?favorited=${userInfo.username}&limit=5&offset=0`)
      .then((res: any) => {
        const result = respListToViewList(res);
        setFavolist([...result]);
      });
  };

  // 이건 컴포넌트로 왜 안만들어 지는가?
  const ListRender = (list: Article[]) => {
    return (
      <>
        {list.map((p) => (
          <ArticlePreview key={p.seq} {...p} articleList={list || []} />
        ))}
      </>
    );
  };

  // const FavolRender = (list: Article[]) => {
  //   return (
  //     <>
  //       <h1>favol</h1>
  //       {list.map((p) => (
  //         <ArticlePreview key={p.seq} {...p} articleList={list || []} />
  //       ))}
  //     </>
  //   );
  // };

  return (
    <>
      <div className="profile-page">
        <UserInfoCard {...userInfo} />
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <ArticlesToggle setToggle={setToggle} />
              {toggle === 'article' ? ListRender(articles) : ListRender(favolist)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
