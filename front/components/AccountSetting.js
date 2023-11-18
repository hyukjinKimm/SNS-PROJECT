import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  Image,
  Row,
  Col,
} from "antd";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const AccountSetting = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  return (
    <>
      <Form
        labelCol={{
          span: 2,
        }}
        wrapperCol={{
          span: 10,
        }}
        layout="horizontal"
        style={{
          width: "60vw",
          marginTop: "30px",
          marginLeft: "3vw",
        }}
      >
        <Form.Item label="닉네임">
          <Input maxLength={100} placeholder="youcancallmekimm" />
        </Form.Item>
        <Form.Item label="소개">
          <Input.TextArea
            showCount
            maxLength={200}
            placeholder="오늘은 어떤 행복한 일이 있었나요?"
            rows={5}
          />
        </Form.Item>
        <Form.Item label="성별">
          <Radio.Group>
            <Radio value="male"> 남성 </Radio>
            <Radio value="female"> 여성 </Radio>
            <Radio value="ohter"> 그 외 </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="생일">
          <DatePicker />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={false}>
            제출
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AccountSetting;
