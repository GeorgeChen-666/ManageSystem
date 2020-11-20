import { atom, selector, useRecoilState } from 'recoil';
import { fetchList } from '../services/process';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';

const usersState = atom({
  key: 'Processes',
  default: {
    listData: {
      items: [],
    },
  },
});
const usersListState = selector({
  key: 'Processes.List',
  get: ({ get }) => get(usersState).listData,
  set: ({ set, get }, newValue) =>
    set(usersState, { ...get(usersState), listData: newValue }),
});
export const useData = () => useRecoilState(usersState);
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