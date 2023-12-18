import { PlusOutlined } from "@ant-design/icons";
import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Cascader,
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
  Checkbox,
} from "antd";
import { signOut } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
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
  const { me, signOutLoading, signOutDone, signOutError } = useSelector(
    (state) => state.user
  );
  const [disable, setDisable] = useState(false);
  const route = useRouter();
  const [withdraw, setWithdraw] = useState(false);
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    if (confirm("회원탈퇴를 진행하시겠습니까?")) {
      setWithdraw(!withdraw);
    }
  }, [withdraw]);
  const onFinish = useCallback((e) => {
    console.log(e);
    console.log("hi");
    dispatch(signOut(e));
  }, []);
  useEffect(() => {
    if (signOutError) {
      alert(signOutError);
      return;
    }
    if (signOutDone) {
      alert("저희 서비스를 이용해 주셔서 감사합니다.");
      route.push("/");
      return;
    }
    return;
  }, [signOutDone, signOutError]);
  const onChange = useCallback((e) => {
    if (e.target.checked) {
      setPassowrd("");
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, []);
  const [password, setPassowrd] = useState("");
  const onChangePassword = useCallback((e) => {
    setPassowrd(e.target.value);
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
                required: !disable,
                message: "비밀번호를 입력해 주세요",
              },
            ]}
            disabled={disable}
          >
            <Input.Password
              onChange={onChangePassword}
              value={password}
              disabled={disable}
            />
          </Form.Item>
          <Form.Item name="social" valuePropName="checked">
            <Checkbox
              onChange={onChange}
              style={{ marginBottom: 10, fontSize: 10 }}
            >
              소셜로그인 연동 아이디라면 체크해 주세요.
            </Checkbox>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={signOutLoading}>
              제출
            </Button>
          </Form.Item>
        </Form>
      ) : null}
    </>
  );
};

export default AccountSetting;
