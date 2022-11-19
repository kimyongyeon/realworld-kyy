import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosService from '../../../../common/AxiosService';
import BE_API from '../../../../common/beApi';
import { detailDate } from '../../../../common/helper';
import { Article } from '../../../article/domain/Article';

export interface IArticlePreviewProps {
  slug: string;
  img: string;
  createdAt: string;
  authorName: string;
  authorUrl: string;
  age: number;
  title: string;
  summary: string;
  tagList: [];
  previewLink: string;

  favoritesCount: number;

  favorited: boolean;

  favoritedBy: [];

  articleList: Article[];

  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

export const ArticlePreview = (props: Partial<IArticlePreviewProps>) => {
  const [isTags, setIsTags] = useState(false);
  const navigate = useNavigate();
  const [count, setCount] = useState(props.favoritesCount || 0);
  const [toggle, setToggle] = useState(props.favorited);

  useEffect(() => {
    // const total = props.favoritesCount || 0;
    // setCount(total);
    // setPrevCount(total);
    console.log(props);
  }, [count]);

  const TagList = () => {
    if (isTags) {
      return (
        <ul className="tag-list">
          <li className="tag-default tag-pill tag-outline">Music</li>
          <li className="tag-default tag-pill tag-outline">Song</li>
        </ul>
      );
    } else {
      return '';
    }
  };

  const favolit = (props: Partial<IArticlePreviewProps>) => {
    const total = (props.favoritesCount || 0) + count;
    return (
      <>
        <i className="ion-heart">{total}</i>
      </>
    );
  };

  const favolToggle = (e: any) => {
    e.preventDefault();
    const slug: string = props.slug || '';
    if (toggle) {
      // 싫어요...
      axiosService.delete(BE_API.DEL_FAVORITE_ARTICLE(slug), {}).then((res) => {
        console.log('싫어요 성공', res);
        // navigate(0);
        setToggle((t) => false);
        setCount((c) => c - 1);
      });
    } else {
      // http://man.hubwiz.com/docset/IonIcons.docset/Contents/Resources/Documents/icons/default/
      axiosService.post(BE_API.POST_FAVORITE_ARTICLE(slug), {}).then((res) => {
        console.log('좋아요 성공', res);
        // navigate(0);
        setToggle((t) => true);
        setCount((c) => c + 1);
      });
    }
  };
  return (
    <>
      <div className="article-preview">
        <div className="article-meta">
          <a href="">
            <img src={props.author?.image} />
          </a>
          <div className="info">
            <a href={props.authorUrl} className="author">
              {props.author?.username}
            </a>
            <span className="date">{detailDate(props?.createdAt || '')}</span>
          </div>
          <button onClick={favolToggle} className="btn btn-outline-primary btn-sm pull-xs-right">
            {favolit(props)}
          </button>
        </div>
        <a href={`/api/articles/${props.slug}`} className="preview-link">
          <h1>{props.title}</h1>
          <p>{props.summary}</p>
          <span>Read more...</span>
          {TagList()}
        </a>
      </div>
    </>
  );
};
