import React, {useRef} from 'react';
import {Modal, Table, Button, Select, Input} from 'antd';
import {useRouteMatch, useHistory} from 'react-router-dom';
import ValidationForm from '../../../components/Form/ValidationForm';
import TaskEditorCell from './TaskEditorCell'

const {Option} = Select;

const dataSource = [
  {}
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
      editor: <Select defaultValue="lucy" style={{width: 120}}>
        <Option value="jack">启动时</Option>
        <Option value="lucy">每x分钟</Option>
        <Option value="disabled">每x个小时</Option>
        <Option value="Yiminghe">每天的x点</Option>
        <Option value="Yiminghe">当日志匹配</Option>
      </Select>
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
      editor: <Input addonBefore={<Select defaultValue="lucy" style={{width: 120}}>
        <Option value="jack">输入命令</Option>
        <Option value="lucy">执行命令</Option>
        <Option value="disabled">修改变量</Option>
      </Select>} />
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
    onCancel={() => history.goBack()}
    destroyOnClose={true}
  >
    <ValidationForm ref={formRef}>
      <div style={{textAlign: "right"}}>
        <Button style={{marginBottom: 6, marginRight:12}}>
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