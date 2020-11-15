import * as userActions from '../../../models/Users';
//import { useDispatch, useSelector } from 'react-redux';
import useLoading from '../../../components/Hooks/useLoading';
import { fetchList } from '../../../services/user';
import { useEffect, useRef } from 'react';
import _ from 'lodash';
import * as userNewActions from '../../../models/Users_new';

export const useScripts = () => {
  const formRef = useRef({});
  const [doFetchList, isFetchListLoading] = useLoading(
    userNewActions.useFetchList()
  );
  const [{ listData }] = userNewActions.useUsersData();
  console.log(9000, listData);

  // const { listData, listDataDone } = useSelector((state) =>
  //   _.get(state, ['Users'])
  // );
  useEffect(async () => {
    await doFetchList();
  }, []);
  console.log(
    'userActions.fetchListData:' + userActions.fetchListData().loading
  );
  return {
    isFetchListLoading,
    formRef,
    listData,
    listDataDone: listData.total,
  };
};
