import React, {useState, useEffect} from 'react';
import {Select, Input} from 'antd';

const {Option} = Select;
export default ({
                  value = {type: 'cmd', value: ''},
                  onChange = () => {
                  }
                }) => {
  const [valueState, setValueState] = useState(value);
  useEffect(() => {
    onChange(value);
  },[]);
  const onFieldChange = (type) => (v) => setValueState((pvalue) => {
    const changedValue = v.target ? v.target.value : v;
    const cuValue = {...pvalue};
    cuValue[type] = changedValue;
    onChange(cuValue);
    return cuValue;
  });
  return <Input
    value={valueState.value}
    onChange={onFieldChange('value')}
    addonBefore={<Select value={valueState.type} style={{width: 120}} onChange={onFieldChange('type')}>
      <Option value="cmd">输入命令</Option>
      <Option value="run">执行文件</Option>
      <Option value="param">修改变量</Option>
    </Select>}/>
}