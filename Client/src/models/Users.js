const initialState = {
  currentUser: null,
};
const Users = (state = initialState, action) => {
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
export const Types = {
  setCurrentUser: `${Users.name}/setCurrentUser`,
};
export default Users;
