import { atom, selector, useRecoilState } from 'recoil';
import { login, fetchList, register, modify } from '../services/user';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';

const usersState = atom({
  key: 'Users',
  default: {
    listData: {
      items: [],
    },
  },
});
const usersListState = selector({
  key: 'Users.List',
  get: ({ get }) => get(usersState).listData,
  set: ({ set, get }, newValue) =>
    set(usersState, { ...get(usersState), listData: newValue }),
});
export const useUsersData = () => useRecoilState(usersState);
export const useFetchList = () => {
  const [listData, setListData] = useRecoilState(usersListState);
  return async (payload = {}, { isNew = false, keepSize = false } = {}) => {
    if (!isNew) {
      const { searchAfter } = listData;
      payload.searchAfter = searchAfter;
    }
    if (keepSize) {
      payload.pageSize = listData.items.length;
    }
    const result = await fetchList(payload);
    setListData(() => {
      let newListData = {};
      if (!isNew) {
        newListData = { ...newListData, ...listData };
      }
      newListData = { ...newListData, ...result.data };
      if (!isNew) {
        newListData.items = [...listData.items, ...result.data.items];
      }
      newListData.searchAfter = _.get(
        _.findLast(result.data.items),
        'id',
        newListData.searchAfter
      );
      return newListData;
    });
  };
};
export const useCheckAutoLogin = () => {
  const doLogin = useDoLogin();
  return () => {
    const autoLoginInfo = JSON.parse(localStorage.getItem('autoLogin') || '{}');
    if (
      autoLoginInfo &&
      autoLoginInfo.remember &&
      autoLoginInfo.expires > new Date().getTime()
    ) {
      doLogin(autoLoginInfo);
    }
  };
};
export const useDoLogin = () => {
  const history = useHistory();
  return async (payload) => {
    const result = await login(payload);
    const { remember } = payload;
    const { jwt } = result.data;
    localStorage.setItem('token', jwt);
    if (remember) {
      payload.expires = new Date().getTime() + 604800000; //一周后，连续一周不进系统就需要重新登录
      localStorage.setItem('autoLogin', JSON.stringify(payload));
    } else {
      localStorage.removeItem('autoLogin');
    }
    history.push('/');
  };
};
export const useDoRegister = () => {
  const doFetchList = useFetchList();
  const history = useHistory();
  return async (payload) => {
    await register(payload);
    await doFetchList({}, { isNew: true, keepSize: true });
    history.goBack();
  };
};
export const useDoModify = () => {
  const doFetchList = useFetchList();
  const history = useHistory();
  return async (payload) => {
    await modify(payload);
    await doFetchList({}, { isNew: true, keepSize: true });
    history.goBack();
  };
};
