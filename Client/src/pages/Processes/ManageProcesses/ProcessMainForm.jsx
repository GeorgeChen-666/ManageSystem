import FormField from '../../../components/Form/FormField';
import { Checkbox, Input, Select } from 'antd';
import ValidationForm from '../../../components/Form/ValidationForm';
import React from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import fpfvs from 'filepond-plugin-file-validate-size';

registerPlugin(fpfvs);

export default (props) => {
  const allowedExtensions = ' js exe bat cmd sh jar class zip'.split(' ');
  return (
    <ValidationForm name={props.name} labelCol={{ span: 5 }}>
      <FormField name="id" hidden={true} initialValue={props.data.id}>
        <Input />
      </FormField>
      <FormField
        name="name"
        required={true}
        label={'服务名称'}
        initialValue={props.data.name}
      >
        <Input />
      </FormField>
      <FormField noStyle shouldUpdate>
        {({ setFieldsValue }) => {
          return (
            <FormField
              name="file"
              label={'服务文件'}
              style={{ textAlign: 'right' }}
              trigger={'onupdatefiles'}
              rules={[
                {
                  validator: async (rule, value) => {
                    const [file = {}] = value;
                    const { fileExtension, filename } = file;
                    if (
                      ![undefined, ...allowedExtensions].includes(
                        fileExtension === filename ? '' : fileExtension
                      )
                    ) {
                      return Promise.reject(new Error('文件类型不支持！'));
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
                onupdatefiles={(fileItems) => {
                  let value = fileItems.length === 0 ? null : fileItems[0].id;
                  setFieldsValue({ cmd: value });
                }}
              />
            </FormField>
          );
        }}
      </FormField>

      <FormField noStyle shouldUpdate={(pv, cv) => pv.file !== cv.file}>
        {({ getFieldValue, getFieldError }) => {
          const fieldValue =
            (!getFieldError('file').length && getFieldValue('file')) || [];
          const fileList = fieldValue.map((file) => {
            let label = file.filename;
            if (file.fileExtension === 'js') {
              label = `node ${label}`;
            } else if (file.fileExtension === 'class') {
              label = `java ${label}`;
            } else if (file.fileExtension === 'jar') {
              label = `java -jar ${label}`;
            }
            return {
              label,
              value: file.id,
            };
          });
          return (
            <FormField
              name="cmd"
              label={'执行命令'}
              initialValue={props.data.cmd}
            >
              <Select options={fileList} />
            </FormField>
          );
        }}
      </FormField>
      <FormField noStyle shouldUpdate={(pv, cv) => pv.file !== cv.file}>
        <FormField
          name="param"
          label={'附加参数'}
          initialValue={props.data.param}
        >
          <Input />
        </FormField>
      </FormField>

      <FormField
        name="autoStart"
        valuePropName="checked"
        label={'自动启动'}
        initialValue={props.data.autoStart}
      >
        <Checkbox />
      </FormField>
    </ValidationForm>
  );
};
