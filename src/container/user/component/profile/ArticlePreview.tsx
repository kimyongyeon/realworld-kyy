import React, { useState } from 'react';

export interface IArticlePreviewProps {
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

  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

function detailDate(value: string) {
  const today = new Date();
  const timeValue = new Date(value);
  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
  if (betweenTime < 1) return '방금전';
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }
  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }
  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }
  return `${Math.floor(betweenTimeDay / 365)}년전`;
}

export const ArticlePreview = (props: Partial<IArticlePreviewProps>) => {
  const [isTags, setIsTags] = useState(false);

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
    return (
      <>
        <i className="ion-heart">{props.favoritesCount}</i>
      </>
    );
  };

  const favolToggle = (e: any) => {
    e.preventDefault();
    alert(1);
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
        <a href={props.previewLink} className="preview-link">
          <h1>{props.title}</h1>
          <p>{props.summary}</p>
          <span>Read more...</span>
          {TagList()}
        </a>
      </div>
    </>
  );
};
