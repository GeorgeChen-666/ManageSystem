import { useStore } from 'react-redux';

export default () => {
  const state = useStore().getState();
  const { currentUser } = state.Users;
  return {
    currentUser,
  };
};
