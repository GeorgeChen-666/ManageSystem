import { atom, selector, useRecoilState } from 'recoil';
import { fetchLogs } from '../services/process';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';

const usersState = atom({
  key: 'ProcessLog',
  default: {
    listData: {
      items: [],
    },
  },
});
const usersListState = selector({
  key: 'ProcessLog.List',
  get: ({ get }) => get(usersState).listData,
  set: ({ set, get }, newValue) =>
    set(usersState, { ...get(usersState), listData: newValue }),
});
export const useData = () => useRecoilState(usersState);
export const useAddNewLogFromWS = () => {
  const [listData, setListData] = useRecoilState(usersListState);
  return (logData) => {
    setListData(() => {
      let newListData = { ...listData };
      newListData.items = [...listData.items];
      newListData.items.splice(0, 0, logData);
      return newListData;
    });
  };
};
export const useFetchList = (id) => {
  const [listData, setListData] = useRecoilState(usersListState);
  return async (payload = {}, { isNew = false, keepSize = false } = {}) => {
    if (!isNew) {
      const { searchAfter } = listData;
      payload.searchAfter = searchAfter;
    }
    if (keepSize) {
      payload.pageSize = listData.items.length;
    }
    const result = await fetchLogs(id, payload);
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
