import * as userModel from '../../../models/Users';
import { useHistory, matchPath, useRouteMatch } from 'react-router-dom';
import useLoading from '../../../components/Hooks/useLoading';
import _ from 'lodash';

export const useScripts = () => {
  const history = useHistory();
  const match = useRouteMatch();
  let id = null;
  if (match.params.id) {
    id = match.params.id * 1;
  }
  const [doSave, isSaveLoading] = useLoading(
    id ? userModel.useDoModify() : userModel.useDoRegister()
  );
  const [{ listData }] = userModel.useData();
  const data = _.find(_.get(listData, ['items']), { id: id * 1 }) || {};
  if (id && id !== data.id) {
    history.goBack();
  }
  return {
    data,
    doSave,
    isSaveLoading,
  };
};
