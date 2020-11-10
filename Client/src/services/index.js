import axios from 'axios';
import jwt_decode from 'jwt-decode';

const registerAxioInterceptors = (store) => {
  axios.interceptors.request.use(
    async (config) => {
      const state = store.getState();
      const { token } = state.Users;
      //const { exp } = jwt_decode(token);
      if (token) {
        const {exp} = jwt_decode(token);
        const fresh = exp * 1000 - new Date().getTime();
        if (fresh < 1800000 && fresh > 0) {
          //TODO 如果快超时了就刷新token
          console.log('需要调用刷token')
        }
        if (config.url !== '/api/users/login') {
          config.headers.Authorization = 'Bearer ' + token;
        }
      }
      return config;
    },
    (error) => {
      console.log('request error')
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const {status} = error.response;
      if(status===401) {
        window.history.pushState({},'','/login')
      }
      console.log('response error',error)
      //debugger;
      return Promise.reject(error);
    }
  );
};
export { registerAxioInterceptors };
