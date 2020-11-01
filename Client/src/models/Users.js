import jwt_decode from 'jwt-decode';
const initialState = {
  getCurrentUser: (token) => {
    if (token) {
      return jwt_decode(token).user;
    }
    return null;
  },
};
const Users = (state = initialState, action) => {
  switch (action.type) {
    case Types.setToken: {
      const { token } = action.payload;
      return {
        ...state,
        token,
      };
    }
    case Types.rememberLogin: {
      const { payload } = action;
      return {
        ...state,
        login: {
          ...payload,
          expires: new Date().getTime() + 604800000, //一周后，连续一周不进系统就需要重新登录
        },
      };
    }
    default:
      return state;
  }
};
export const setToken = (token) => ({
  type: Types.setToken,
  payload: { token },
});
export const rememberLogin = (payload) => ({
  type: Types.rememberLogin,
  payload,
});
export const Types = {
  setToken: `${Users.name}/setToken`,
  rememberLogin: `${Users.name}/rememberLogin`,
};
export default Users;
