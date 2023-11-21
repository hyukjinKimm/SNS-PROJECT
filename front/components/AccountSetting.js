import { PlusOutlined } from "@ant-design/icons";
import React, { useCallback, useState } from "react";
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
import { signOut } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
    md: {
      span: 18,
      offset: 5,
    },
  },
};

const AccountSetting = () => {
  const { me } = useSelector((state) => state.user);
  const [withdraw, setWithdraw] = useState(false);
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    if (confirm("회원탈퇴를 진행하시겠습니까?")) {
      setWithdraw(!withdraw);
    }
  }, [withdraw]);
  const onFinish = useCallback((e) => {
    const { email, password } = e;
    dispatch(signOut({ email, password }));
  }, []);
  return (
    <>
      {withdraw ? null : (
        <Button
          danger
          type="primary"
          htmlType="submit"
          onClick={onClick}
          style={{
            marginTop: "3vh",
            marginLeft: "2vw",
          }}
        >
          회원탈퇴
        </Button>
      )}
      {withdraw ? (
        <Form
          labelCol={{
            offset: 0,
            span: 3,
          }}
          wrapperCol={{
            offset: 0,
            span: 10,
          }}
          layout="horizontal"
          style={{
            width: "60vw",
            marginTop: "30px",
            marginLeft: "3vw",
          }}
          onFinish={onFinish}
        >
          <div style={{ margin: "2vh" }}>
            회원 탈퇴를위해 아래 정보를 입력해 주세요.
          </div>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                required: true,
                message: "이메일을 입력해 주세요.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="비밀번호"
            rules={[
              {
                required: true,
                message: "비밀번호를 입력해 주세요",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={false}>
              제출
            </Button>
          </Form.Item>
        </Form>
      ) : null}
    </>
  );
};

export default AccountSetting;
