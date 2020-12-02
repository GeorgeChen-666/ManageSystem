import React, { useRef } from 'react';
import { Checkbox, Input, Modal, Dropdown, Button, Select } from 'antd';
import { Link, matchPath, useRouteMatch, useHistory } from 'react-router-dom';
import ValidationForm from '../../../components/Form/ValidationForm';
import FormField from '../../../components/Form/FormField';
import { DownOutlined } from '@ant-design/icons';
import styles from '../Style.module.less';

const { Option } = Select;

export default (props) => {
  const history = useHistory();
  const formRef = useRef({});
  const data = {};
  return (
    <Modal
      title="创建进程"
      centered
      visible={true}
      onCancel={() => history.goBack()}
      width={'50%'}
      destroyOnClose={true}
      className={styles.terminalModal}
    >
      <ValidationForm ref={formRef} name={props.name} onSubmit={() => {}}>
        <FormField name="id" hidden={true} initialValue={data.id}>
          <Input />
        </FormField>
        <FormField
          labelCol={{ span: 5 }}
          label={' '}
          style={{ textAlign: 'right' }}
        >
          <Select defaultValue={1}>
            <Option value={1}>高级模式</Option>
            <Option value={2}>Java进程</Option>
            <Option value={3}>Node进程</Option>
          </Select>
        </FormField>
        <FormField
          name="name"
          required={true}
          label={'服务器名'}
          labelCol={{ span: 5 }}
          initialValue={data.nickname}
        >
          <Input />
        </FormField>
        <FormField
          name="param"
          required={true}
          label={'附加参数'}
          labelCol={{ span: 5 }}
          initialValue={data.username}
        >
          <Input />
        </FormField>
        <FormField
          name="isAutoStart"
          valuePropName="checked"
          label={'自动启动'}
          labelCol={{ span: 5 }}
          initialValue={data.permissionType}
        >
          <Checkbox />
        </FormField>
      </ValidationForm>
    </Modal>
  );
};
