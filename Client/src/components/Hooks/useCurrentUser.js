import jwt_decode from 'jwt-decode';
export default () => {
  return {
    getCurrentUser: () => {
      const token = localStorage.getItem('token');
      if (token) {
        return jwt_decode(token).user;
      } else {
        return null;
      }
    },
  };
};
