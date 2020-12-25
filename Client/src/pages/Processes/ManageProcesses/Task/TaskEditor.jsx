import React, {useRef} from 'react';
import {Modal, Table, Button} from 'antd';
import {useRouteMatch, useHistory} from 'react-router-dom';
import ValidationForm from '../../../../components/Form/ValidationForm';
import TaskEditorCell from './TaskEditorCell';
import EventInput from './EventInput';
import WhenInput from './WhenInput';
import FormField from "../../../../components/Form/FormField";


const dataSource = [
];

const columns = [
  {
    title: '时机',
    dataIndex: 'when',
    key: 'when',
    width: '40%',
    editable: true,
    onCell: (record) => ({
      record,
      key: 'when',
      editing: true,
      editor: <FormField name="when" style={{marginBottom: 0}}><WhenInput /></FormField>
    }),
  },
  {
    title: '行为',
    dataIndex: 'event',
    key: 'event',
    width: '40%',
    editable: true,
    onCell: (record) => ({
      record,
      key: 'event',
      editing: true,
      editor: <FormField name="event" style={{marginBottom: 0}}><EventInput /></FormField>
    }),
  },
  {
    title: '操作',
    dataIndex: 'operation',
    render: () => {
      return (<span>
        <a href="JavaScript:;" style={{marginRight: 8}}>执行</a>
        <a href="JavaScript:;" style={{marginRight: 8}}>编辑</a>
        <a href="JavaScript:;" style={{marginRight: 8}}>删除</a>
      </span>);
    }
  }
];
export default () => {
  const history = useHistory();
  const formRef = useRef({});
  return (<Modal
    title="任务管理"
    centered
    visible={true}
    width={'75%'}
    onOk={() => formRef.current.submit()}
    onCancel={() => history.goBack()}
    destroyOnClose={true}
  >
    <ValidationForm ref={formRef} onSubmit={(v)=>{console.log(v)}}>
      <div style={{textAlign: "right"}}>
        <Button style={{marginBottom: 6, marginRight: 12}}>
          导入...
        </Button>
        <Button type="primary" style={{marginBottom: 6}}>
          增加
        </Button>
      </div>
      <Table
        components={{
          body: {
            cell: TaskEditorCell,
          },
        }}
        dataSource={dataSource}
        columns={columns}
        bordered
      />
    </ValidationForm>

  </Modal>)
}