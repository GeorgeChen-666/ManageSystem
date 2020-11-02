import axios from 'axios';
import jwt_decode from 'jwt-decode';

const registerAxioInterceptors = (store) => {
  axios.interceptors.request.use(
    async (config) => {
      const state = store.getState();
      const { token } = state.Users;
      //const { exp } = jwt_decode(token);
      //TODO 如果快超时了就刷新token
      return config;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      //debugger;
      return Promise.reject(error);
    }
  );
};
export { registerAxioInterceptors };
