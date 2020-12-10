import jwt_decode from 'jwt-decode';

export const getUserFromToken = (invalidCB, refreshCB = () => {}) => {
  const token = localStorage.getItem('token');
  if (token) {
    const jwt = jwt_decode(token);
    const fresh = jwt.exp * 1000 - new Date().getTime();
    if (fresh < 1800000 && fresh > 0) {
      //TODO 如果快超时了就刷新token
      console.log('需要调用刷token');
      refreshCB && refreshCB();
    }
    if (fresh <= 0) {
      invalidCB && invalidCB();
    }
    return { ...jwt, token };
  }
  return {};
};
