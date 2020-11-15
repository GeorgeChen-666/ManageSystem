import jwt_decode from 'jwt-decode';
import { fetchList } from '../services/user';

const initialState = {
  getCurrentUser: (token) => {
    if (token) {
      return jwt_decode(token).user;
    }
    return null;
  },
  listData: [],
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
          remember: false,
          ...payload,
          expires: payload && new Date().getTime() + 604800000, //一周后，连续一周不进系统就需要重新登录
        },
      };
    }
    case Types.saveListData: {
      const { listData } = action.payload;
      return {
        ...state,
        listDataDone: true,
        listData,
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
export const saveListData = (payload) => ({
  type: Types.saveListData,
  payload,
});
export const fetchListData = () => async (dispatch, getState) => {
  const result = await fetchList();
  await dispatch(saveListData({ listData: result.data }));
};
export const Types = {
  setToken: `${Users.name}/setToken`,
  rememberLogin: `${Users.name}/rememberLogin`,
  saveListData: `${Users.name}/saveListData`,
};
export default Users;
