export interface ArticleInfo {
  title: string;
  description: string;
  body: string;
  tagList: string;
}

export class Article {
  public seq: any = 0;
  private title?: string | undefined = '';
  private description?: string | undefined = '';
  private body?: string | undefined = '';
  private tagList?: string | undefined = '';

  constructor(articleInfo?: ArticleInfo) {
    this.title = articleInfo?.title;
    this.description = articleInfo?.description;
    this.body = articleInfo?.body;
    this.tagList = articleInfo?.tagList;
  }

  initArticleInfo(): ArticleInfo {
    return {
      title: '',
      description: '',
      body: '',
      tagList: '',
    };
  }

  createForm(articleInfo: ArticleInfo) {
    return {
      article: {
        ...articleInfo,
      },
    };
  }
}
