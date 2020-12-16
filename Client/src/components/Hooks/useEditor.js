import {useRouteMatch} from 'react-router-dom';
import useLoading from "./useLoading";

export default (model) => {
  const match = useRouteMatch();
  const getId = () => {
    let id = null;
    if (match.params.id) {
      id = match.params.id * 1;
    }
    return id;
  };
  const getEntity = () => {
    const id = getId();
    const getEntity = model.useEntity();
    return getEntity(id);
  };
  const [doSave, isSaveLoading] = useLoading(model.useDoModify());
  return {
    getId,
    getEntity,
    doSave,
    isSaveLoading
  };
};
