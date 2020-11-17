import useLoading from '../../../components/Hooks/useLoading';
import {useEffect, useRef} from 'react';
import * as userModel from '../../../models/Users';

export const useScripts = () => {
  const formRef = useRef({});
  const [doFetchList, isFetchListLoading] = useLoading(
    userModel.useFetchList()
  );
  const [{listData}] = userModel.useUsersData();
  console.log('asd', listData)
  useEffect(() => {
    doFetchList();
  }, []);
  return {
    doFetchList,
    isFetchListLoading,
    formRef,
    listData,
    listDataDone: listData.total,
  };
};
