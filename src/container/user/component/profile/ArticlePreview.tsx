import React, { useState } from 'react';

export interface IArticlePreviewProps {
  img: string;
  date: string;
  authorName: string;
  authorUrl: string;
  age: number;
  title: string;
  summary: string;
  tagList: [];
  previewLink: string;
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
  return (
    <>
      <div className="article-preview">
        <div className="article-meta">
          <a href="">
            <img src={props.img} />
          </a>
          <div className="info">
            <a href={props.authorUrl} className="author">
              {props.authorName}
            </a>
            <span className="date">{props.date}</span>
          </div>
          <button className="btn btn-outline-primary btn-sm pull-xs-right">
            <i className="ion-heart"></i> {props.age}
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
