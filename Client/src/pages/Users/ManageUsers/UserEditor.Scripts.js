import * as userModel from '../../../models/Users';
import {useHistory} from 'react-router-dom';
import useEditor from '../../../components/Hooks/useEditor';

export const useScripts = () => {
  //const history = useHistory();
  const editor = useEditor(userModel);
  //let id = editor.getId();
  const data = editor.getEntity();
  // if (id && id !== data.id) {
  //   history.goBack();
  // }
  return {
    data,
    doSave: editor.doSave,
    isSaveLoading: editor.isSaveLoading,
  };
};
