import axios from 'axios';
import User from '../container/user/domain/User';
import commonLog from './LoggingService';
import progressShare from './ProgressShare';

class AxiosService {
  private static CancelToken = axios.CancelToken;
  private static source = this.CancelToken.source();
  private accessToken: string;

  private progress = 0;
  private timerId: any = null;

  setProgress(value: number) {
    this.progress = value;
    progressShare.setValue(value);
  }

  public getProgress() {
    return this.progress;
  }

  timer() {
    if (this.progress < 98) {
      const diff = 100 - this.progress;
      const inc = diff / (10 + this.progress * (1 + this.progress / 100)); // 증가값
      this.setProgress(this.progress + inc);
    }
    this.timerId = setTimeout(this.timer, 50); // 50 ms 단위로 timer 재귀호출
  }

  constructor() {
    const user = new User();
    this.accessToken = user.getToken();
    axios.defaults.baseURL = 'https://api.realworld.io/api/';
    // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    // 라이브러리의 timeout 기본 값을 2.5초로 재 정의하여
    // 인스턴스의 모든 요청은 2.5초 간만 대기 후 타임아웃 처리합니다.
    axios.defaults.timeout = 2500;

    // 최종적으로 인스턴스에 설정된 timeout 구성 값 5000으로 덮어씁니다.
    // instance.get('/longRequest', {
    //   timeout: 5000,
    // });

    // 요청 인터셉터 추가
    axios.interceptors.request.use(
      (config) => {
        // 요청을 보내기 전에 수행할 일
        // commonLog.info(`request interceptor config : ${JSON.stringify(config)}`);
        this.setProgress(0);
        this.timer();
        return config;
      },
      (error) => {
        // 오류 요청을 보내기전 수행할 일
        return Promise.reject(error);
      }
    );

    // 응답 인터셉터 추가
    axios.interceptors.response.use(
      (response) => {
        if (this.timerId) {
          clearTimeout(this.timerId); // HTTP 응답시 timer 해제
          this.timerId = null;
        }
        this.setProgress(100);
        // 응답 데이터를 가공
        commonLog.info(`response interceptor config : ${JSON.stringify(response)}`);
        return response;
      },
      (error) => {
        // 오류 응답을 처리
        return Promise.reject(error);
      }
    );
  }

  get(url: string) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          validateStatus: function (status) {
            // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
            return status < 500;
          },
          // cancelToken: this.source.token,
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        // 응답(성공)
        .then(function (response) {
          resolve(response);
        })
        // 응답(실패)
        .catch(function (error) {
          if (axios.isCancel(error)) {
            commonLog.info('Request canceled', error.message);
            reject(error.message);
          } else {
            // 오류 처리
          }

          if (error.response) {
            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            commonLog.info(error.response.data);
            commonLog.info(error.response.status);
            commonLog.info(error.response.headers);
          } else if (error.request) {
            // 요청이 이루어 졌으나 응답을 받지 못했습니다.
            // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
            // Node.js의 http.ClientRequest 인스턴스입니다.
            commonLog.info(error.request);
          } else {
            // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            commonLog.info('Error', error.message);
          }
          commonLog.info(error.config);
        })
        // 응답(항상 실행)
        .then(function () {
          // ...
        });
    });
  }

  post(url: string, data: any) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .then(function (response) {
          commonLog.info(response);
          resolve(response);
        })
        .catch(function (error) {
          commonLog.info(error);
          reject(error.message);
          // 요청 취소 (message 매개 변수는 선택 사항)
          // this.source.cancel('Operation canceled by the user.');
        });
    });
  }

  put(url: string, data: any) {
    return new Promise((resolve, reject) => {
      axios
        .put(url, data, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .then(function (response) {
          commonLog.info(response);
          resolve(response);
        })
        .catch(function (error) {
          commonLog.info(error);
          reject(error.message);
          // 요청 취소 (message 매개 변수는 선택 사항)
          // this.source.cancel('Operation canceled by the user.');
        });
    });
  }

  delete(url: string, data: any) {
    return new Promise((resolve, reject) => {
      axios
        .delete(url, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .then(function (response) {
          commonLog.info(response);
          resolve(response);
        })
        .catch(function (error) {
          commonLog.info(error);
          reject(error.message);
          // 요청 취소 (message 매개 변수는 선택 사항)
          // this.source.cancel('Operation canceled by the user.');
        });
    });
  }

  all(urls: []) {
    axios.all(urls).then(
      axios.spread(function (acct, perms) {
        // Both requests are now complete
      })
    );
  }
}
const axiosService = new AxiosService();
export default axiosService;
