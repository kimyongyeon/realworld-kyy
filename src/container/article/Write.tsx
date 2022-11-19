import { useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { useStateProxy } from 'use-state-proxy';
import axiosService from '../../common/AxiosService';
import BE_API from '../../common/beApi';
import progressShare from '../../common/ProgressShare';
import { Article } from './domain/Article';

export const Write = () => {
  const article = new Article();
  const articleInfo = useStateProxy(article.initArticleInfo());
  const [progress, setProgress] = useState(0);
  const [progressYn, setProgressYn] = useState(false);

  const update = (e: any) => {
    e.preventDefault();
    const form = article.createForm(articleInfo);

    setProgressYn(true);

    axiosService
      .post(BE_API.POST_ARTICLES, form)
      .then((res) => {
        console.log(res);
        // progressShare.setValue(0);
        setProgress(progressShare.getValue());
        // setProgressYn(false);

        // todo: 화면 목록으로 이동....
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
      <div className="editor-page">
        {<ProgressBar now={progress} label={`${progress}%`} />}
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Article Title"
                      value={articleInfo?.title}
                      onChange={(e) => (articleInfo.title = e.target.value)}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="What's this article about?"
                      value={articleInfo?.description}
                      onChange={(e) => (articleInfo.description = e.target.value)}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      placeholder="Write your article (in markdown)"
                      value={articleInfo?.body}
                      onChange={(e) => (articleInfo.body = e.target.value)}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter tags"
                      value={articleInfo?.tagList}
                      onChange={(e) => (articleInfo.tagList = e.target.value)}
                    />
                    <div className="tag-list"></div>
                  </fieldset>
                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    onClick={(e) => update(e)}
                  >
                    Publish Article
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
