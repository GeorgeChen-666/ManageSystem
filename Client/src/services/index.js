import _ from 'lodash';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { getUserFromToken } from '../utils/token';

const registerAxioInterceptors = () => {
  axios.interceptors.request.use(
    async (config) => {
      const isLogin = config.url === '/api/users/login'
      const invalidCB = () => {
        if (!isLogin) {
          window.location.href = '/login';
        }
      };
      const { token } = getUserFromToken(invalidCB);
      if (token && !isLogin) {
        config.headers.Authorization = 'Bearer ' + token;
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
