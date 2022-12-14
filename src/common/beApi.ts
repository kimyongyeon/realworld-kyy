const BE_API = {
  POST_LOGIN: '/users/login',
  POST_REGISTER: '/users',
  GET_CURRENT_USER: '/user',
  PUT_UPDATE_USER: '/user',
  GET_PROFILE: (username: string) => `/profiles/${username}`,
  POST_FOLLOW_USER: (username: string) => `/profiles/${username}/follow`,
  DEL_FOLLOW_USER: (username: string) => `/profiles/${username}/follow`,
  GET_ARTICLES: '/articles',
  FEED_ARTICLES: '/articles/feed',
  GET_ARTICLES_SLUG: (slug: string) => `/articles/${slug}`,
  POST_ARTICLES: `/articles`,
  PUT_ARTICLES: (slug: string) => `/articles/${slug}`,
  DEL_ARTICLES: (slug: string) => `/articles/${slug}`,
  ADD_COMMENT_ARTICLES: (slug: string) => ` /articles/${slug}/comments`,
  GET_COMMENT_ARTICLES: (slug: string) => ` /articles/${slug}/comments`,
  DEL_COMMENT_ARTICLES: (slug: string, id: string) => ` /articles/${slug}/comments/${id}`,
  POST_FAVORITE_ARTICLE: (slug: string) => `/articles/${slug}/favorite`,
  DEL_FAVORITE_ARTICLE: (slug: string) => `/articles/${slug}/favorite`,
  GET_TAGS: `/tags`,
};
export default BE_API;
