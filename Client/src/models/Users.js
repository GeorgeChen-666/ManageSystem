const initialState = {
  currentUser: null,
};
const namespace = 'Users';
export const Types = {
  setCurrentUser: `${namespace}/setCurrentUser`,
};
const users = (state = initialState, action) => {
  switch (action.type) {
    case Types.setCurrentUser: {
      const { username } = action.payload;
      console.log('reducer!!!');
      return {
        ...state,
        currentUser: username,
      };
    }
    default:
      return state;
  }
};
export const setCurrentUser = (username) => ({
  type: Types.setCurrentUser,
  payload: { username },
});
export default users;
