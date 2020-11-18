import useLoading from '../../../components/Hooks/useLoading';
import {useEffect, useRef} from 'react';
import * as userModel from '../../../models/Users';

export const useScripts = () => {
  const formRef = useRef({});
  const [doFetchList, isFetchListLoading] = useLoading(
    userModel.useFetchList()
  );
  useEffect(() => {
    doFetchList({}, {isNew: true});
  }, []);
  const [{listData}] = userModel.useUsersData();
  console.log('listData', listData);
  return {
    doFetchList,
    isFetchListLoading,
    formRef,
    listData,
    listDataDone: listData.total,
  };
};
