import { useStore } from 'react-redux';
export default () => {
  const store = useStore();
  return {
    getCurrentUser: () => {
      const state = store.getState();
      const { getCurrentUser, token } = state.Users;
      return getCurrentUser(token);
    },
  };
};
