import commonLog from '../../../common/LoggingService';

export interface UserInfo {
  email?: string | undefined;
  username?: string | undefined;
  bio?: string | undefined;
  image?: string | undefined;
  token?: string | undefined;
  password?: string | undefined;
}
export interface UserResponse {
  user: UserInfo;
}
export default class User {
  private email: string | undefined;
  private password: string | undefined;
  private username: string | undefined;
  private image: string | undefined;

  constructor(userInfo?: UserInfo) {
    this.email = userInfo?.email;
    this.password = userInfo?.password;
    this.username = userInfo?.username;
    this.image = userInfo?.image;
  }

  logout() {
    sessionStorage.removeItem('login');
  }

  getToken() {
    const user = sessionStorage.getItem('login') || '';
    if (user !== '') {
      return JSON.parse(user).token;
    } else {
      return '';
    }
  }

  getUserInfo(): UserInfo {
    const user = sessionStorage.getItem('login') || '';
    if (user !== '') {
      return JSON.parse(user);
    } else {
      return {
        email: '',
        username: '',
        bio: '',
        image: '',
        token: '',
      };
    }
  }

  isLogin() {
    const is = sessionStorage.getItem('login');
    return is !== null;
  }

  setLoginInfo(result: UserResponse) {
    commonLog.info(JSON.stringify(result.user));
    // {"user":{"email":"test1818@naver.com","username":"테스트계정","bio":null,"image":"https://api.realworld.io/images/smiley-cyrus.jpeg","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxODE4QG5hdmVyLmNvbSIsInVzZXJuYW1lIjoi7YWM7Iqk7Yq46rOE7KCVIiwiaWF0IjoxNjY4MjYxMjQyLCJleHAiOjE2NzM0NDUyNDJ9.S3dJbwWiw8tUsvN0wvYqmmsG5KtNn2Fs5dAYiRv4E8o"}}
    sessionStorage.setItem('login', JSON.stringify(result.user));
  }

  createloginForm() {
    return {
      user: {
        email: this.email,
        password: this.password,
      },
    };
  }

  createSignupForm() {
    return {
      user: {
        email: this.email,
        password: this.password,
        username: this.username,
      },
    };
  }
}
