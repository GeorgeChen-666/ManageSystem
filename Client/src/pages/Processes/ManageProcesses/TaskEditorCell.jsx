import React from 'react';
import FormField from '../../../components/Form/FormField';


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
    <span>{editing ? <FormField style={{marginBottom: 0}}>{editor}</FormField> : children}</span>
  </td>)
}