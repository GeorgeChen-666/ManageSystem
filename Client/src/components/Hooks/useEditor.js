import { useRouteMatch } from 'react-router-dom';
export default () => {
  const match = useRouteMatch();
  const getId = () => {
    let id = null;
    if (match.params.id) {
      id = match.params.id * 1;
    }
    return id;
  };
  const getEntity = (model) => {
    const id = getId();
    const getEntity = model.useEntity();
    return getEntity(id);
  };
  return {
    getId,
    getEntity,
  };
};
