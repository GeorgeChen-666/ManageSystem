import React, {useState, useEffect} from 'react';
import {Select, Input} from 'antd';

const {Option} = Select;
export default ({
                  value = {type: 'start', value: ''},
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
      <Option value="start">启动时</Option>
      <Option value="minute">每x分钟</Option>
      <Option value="hour">每x个小时</Option>
      <Option value="eachDay">每天的x点</Option>
      <Option value="logMatch">当日志匹配</Option>
    </Select>}/>
}