import {atom, selector, useRecoilState} from 'recoil';
import {fetchList, modify, modifyTask} from '../services/process';
import {useHistory} from 'react-router-dom';
import _ from 'lodash';

const state = atom({
  key: 'Processes',
  default: {
    listData: {
      items: [],
    },
  },
});
const listState = selector({
  key: 'Processes.List',
  get: ({get}) => get(state).listData,
  set: ({set, get}, newValue) =>
    set(state, {...get(state), listData: newValue}),
});
export const useData = () => useRecoilState(state);
export const useFetchList = () => {
  const [listData, setListData] = useRecoilState(listState);
  return async (payload = {}, {isNew = false, keepSize = false} = {}) => {
    if (!isNew) {
      const {searchAfter} = listData;
      payload.searchAfter = searchAfter;
    }
    if (keepSize) {
      payload.pageSize = listData.items.length;
    }
    const result = await fetchList(payload);
    setListData(() => {
      let newListData = {};
      if (!isNew) {
        newListData = {...newListData, ...listData};
      }
      newListData = {...newListData, ...result.data};
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
export const useEntity = () => {
  const [listData] = useRecoilState(listState);
  return (id) => _.find(_.get(listData, ['items']), {id: id * 1}) || {};
};
export const useDoModify = () => {
  const doFetchList = useFetchList();
  const history = useHistory();
  return async (payload) => {
    payload.file = _.map(payload.file, file => ({fileName: file.filename, base64: file.getFileEncodeBase64String()}));
    await modify(payload);
    await doFetchList({}, {isNew: true, keepSize: true});
    history.goBack();
  };
};

export const useDoModifyTask = () => {
  return async (payload) => {
    await modifyTask(payload);
  }
};
