import _ from 'lodash';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const registerAxioInterceptors = () => {
  axios.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        const { exp } = jwt_decode(token);
        const fresh = exp * 1000 - new Date().getTime();
        if (fresh < 1800000 && fresh > 0) {
          //TODO 如果快超时了就刷新token
          console.log('需要调用刷token');
        }
        if (fresh <= 0) {
          window.location.href = '/login';
        }
        if (config.url !== '/api/users/login') {
          config.headers.Authorization = 'Bearer ' + token;
        }
      }
      return config;
    },
    (error) => {
      console.log('request error');
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const status = _.get(error, ['response', 'status']);
      if (status === 401) {
        localStorage.removeItem('token');
      }
      return Promise.reject(error);
    }
  );
};
export { registerAxioInterceptors };
