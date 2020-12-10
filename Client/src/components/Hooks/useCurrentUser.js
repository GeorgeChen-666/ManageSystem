import { getUserFromToken } from '../../utils/token';

export default () => {
  const invalidCB = () => {
    window.location.href = '/login';
  };
  return {
    getCurrentUser: () => {
      const { user } = getUserFromToken(invalidCB);
      return user;
    },
  };
};
