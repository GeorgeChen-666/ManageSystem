import * as userModel from '../../../models/Users';
import { useHistory } from 'react-router-dom';
import useLoading from '../../../components/Hooks/useLoading';
import useEditor from '../../../components/Hooks/useEditor';

export const useScripts = () => {
  const history = useHistory();
  const editor = useEditor();
  let id = editor.getId();
  const [doSave, isSaveLoading] = useLoading(
    id ? userModel.useDoModify() : userModel.useDoRegister()
  );
  const data = editor.getEntity(userModel);
  if (id && id !== data.id) {
    history.goBack();
  }
  return {
    data,
    doSave,
    isSaveLoading,
  };
};
