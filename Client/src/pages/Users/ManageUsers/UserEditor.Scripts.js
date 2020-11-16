import * as userModel from '../../../models/Users';
import { useHistory, matchPath, useRouteMatch } from 'react-router-dom';
import useLoading from '../../../components/Hooks/useLoading';
import { useEffect } from 'react';
import _ from 'lodash';

export const useScripts = (props, ref) => {
  const history = useHistory();
  //const dispatch = useDispatch();
  const match = useRouteMatch();
  const currentMatch = matchPath(history.location.pathname, {
    path: [`${match.path}/add`, `${match.path}/modify/:id`],
    exact: true,
    strict: false,
  });
  let id = null;
  if (currentMatch) {
    id = currentMatch.params.id * 1;
  }
  const [doSave, isSaveLoading] = useLoading(id ? userModel.useDoModify() : userModel.useDoRegister());
  useEffect(() => {
    ref.current.isSaveLoading = isSaveLoading;
  }, [isSaveLoading]);
  const [{ listData }] = userModel.useUsersData();
  const data = _.find(_.get(listData, ['items']), { id: id * 1 }) || {};
  if (currentMatch && id !== data.id) {
    history.goBack();
  }
  return {
    data,
    doSave,
  };
};
