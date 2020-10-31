const initialState = {
  currentUser: null,
};
const Users = (state = initialState, action) => {
  switch (action.type) {
    case Types.setCurrentUser: {
      const { user, token } = action.payload;
      console.log('reducer!!!');
      return {
        ...state,
        token,
        currentUser: user,
      };
    }
    default:
      return state;
  }
};
export const setCurrentUser = (user, token) => ({
  type: Types.setCurrentUser,
  payload: { user, token },
});
export const Types = {
  setCurrentUser: `${Users.name}/setCurrentUser`,
};
export default Users;
