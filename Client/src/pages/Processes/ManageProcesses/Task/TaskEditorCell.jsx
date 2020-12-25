import React from 'react';
import FormField from '../../../../components/Form/FormField';


export default ({
                  children,
                  editing,
                  dataIndex,
                  editor,
                  inputType,
                  record,
                  index, ...restProps
                }) => {
  return (<td {...restProps}>
    <span>{editing ? editor : children}</span>
  </td>)
}