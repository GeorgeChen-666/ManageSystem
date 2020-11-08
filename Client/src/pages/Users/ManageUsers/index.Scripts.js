import * as userActions from '../../../models/Users';
import { useDispatch, useSelector } from 'react-redux';
import useLoading from '../../../components/Hooks/useLoading';
import { fetchList } from '../../../services/user';
import { useEffect } from 'react';
import _ from 'lodash';
//
export const useScripts = (props) => {
  const dispatch = useDispatch();
  const [doFetchList, isFetchListLoading] = useLoading(fetchList);
  const listData = useSelector((state) => _.get(state, ['Users', 'listData']));
  useEffect(() => {
    (async () => {
      const result = await doFetchList();
      await dispatch(userActions.saveListData({ listData: result.data }));
    })();
  }, [doFetchList]);
  return {
    isFetchListLoading,
    listData,
  };
};
