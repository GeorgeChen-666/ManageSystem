import FormField from '../../../components/Form/FormField';
import {Checkbox, Input, Select} from 'antd';
import ValidationForm from '../../../components/Form/ValidationForm';
import React, {forwardRef} from 'react';
import {FilePond, registerPlugin} from 'react-filepond';
import fpfvs from 'filepond-plugin-file-validate-size';


registerPlugin(fpfvs);

function fileName2Command(filename = "") {
  const [, ext] = filename.split('.');
  let cmd = filename;
  if (ext === 'js') {
    cmd = `node ${cmd}`;
  } else if (ext === 'class') {
    cmd = `java ${cmd}`;
  } else if (ext === 'jar') {
    cmd = `java -jar ${cmd}`;
  }
  return cmd;
}

export default forwardRef((props, ref) => {
  const allowedExtensions = ' js exe bat cmd sh jar class zip'.split(' ');
  return (
    <ValidationForm name={props.name} ref={ref} labelCol={{span: 5}} onSubmit={props.onSubmit}>
      <FormField name="id" hidden={true} initialValue={props.data.id}>
        <Input/>
      </FormField>
      <FormField
        name="name"
        required={true}
        label={'服务名称'}
        initialValue={props.data.name}
      >
        <Input/>
      </FormField>
      <FormField noStyle shouldUpdate>
        {({setFieldsValue}) => {
          return (
            <FormField
              name="file"
              label={'上传文件'}
              style={{textAlign: 'right'}}
              trigger={'onupdatefiles'}
              //getValueProps={(value) => {debugger;return 666}}//(value||[]).map(f=>f.file)
              rules={[
                {
                  validator: async (rule, value) => {
                    const [file = {}] = value || [];
                    const {fileExtension, filename} = file;
                    if (
                      ![undefined, ...allowedExtensions].includes(
                        fileExtension === filename ? '' : fileExtension
                      )
                    ) {
                      return Promise.reject(new Error('文件类型不支持！'));
                    }
                    if (props.data.exeOptions.includes(filename)) {
                      return Promise.reject(new Error('文件名重复！'));
                    }
                  },
                },
              ]}
            >
              <FilePond
                labelIdle={`拖拽文件至此或 <span class="filepond--label-action">浏览</span><br />支持格式：${allowedExtensions.join(
                  ','
                )}`}
                allowMultiple={false}
                maxFiles={1}
              />
            </FormField>
          );
        }}
      </FormField>

      <FormField noStyle shouldUpdate={(pv, cv) => pv.file !== cv.file}>
        {({getFieldValue, getFieldError, setFieldsValue}) => {
          const fieldValue =
            (!getFieldError('file').length && getFieldValue('file')) || [];
          const fileListUpload = fieldValue.map((file) => ({
            value: file.filename,
          }));
          const fileListExist = props.data.exeOptions.map((fileName) => ({
            value: fileName,
          }));
          const fileList = [...fileListUpload, ...fileListExist];
          return (
            <FormField
              name="exeList"
              label={'入口文件'}
            >
              <Select options={fileList} onChange={(value) => {
                setFieldsValue({cmd: fileName2Command(value), param: ''});
              }}/>
            </FormField>
          );
        }}
      </FormField>
      <FormField noStyle shouldUpdate={(pv, cv) => pv.exeList !== cv.exeList}>
        <FormField
          name="cmd"
          label={'执行命令'}
          initialValue={props.data.cmd}
        >
          <Input/>
        </FormField>
      </FormField>
      <FormField noStyle shouldUpdate={(pv, cv) => pv.exeList !== cv.exeList}>
        <FormField
          name="param"
          label={'附加参数'}
          initialValue={props.data.param}
        >
          <Input/>
        </FormField>
      </FormField>

      <FormField
        name="autoStart"
        valuePropName="checked"
        label={'自动启动'}
        initialValue={props.data.autoStart}
      >
        <Checkbox/>
      </FormField>
    </ValidationForm>
  );
});
