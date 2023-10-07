import React, { useState, useCallback } from "react";
import Link from "next/link";
import { Button, Checkbox, Form, Input } from "antd";
import styled from "styled-components";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const InputWrapper = styled(Input)`
  margin-left: 15px;
`;
const FormWrapper = styled(Form)`
  max-width: 600px;
  padding: 10px;
`;
// 리렌더링 시 return 부분에서 바뀐 부분만 다시그린다.
const LoginForm = ({ setIsLoggedIn }) => {
  const [id, setId] = useState("");
  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);
  const [password, setPassword] = useState("");
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onFinish = useCallback(
    (e) => {
      // e.preventDefault 적용 되어있음
      console.log("LogIn 실행");
      console.log(e, id, password);
      setIsLoggedIn(true);
    },
    [id, password]
  );
  return (
    <>
      <FormWrapper
        labelCol={{
          span: 100,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="아이디"
          name="user-id"
          rules={[
            {
              required: true,
              message: "아이디를 입력해주세요",
            },
          ]}
        >
          <InputWrapper value={id} onChange={onChangeId} />
        </Form.Item>

        <Form.Item
          label="비밀번호"
          name="user-password"
          rules={[
            {
              required: true,
              message: "비밀번호를 입력해 주세요",
            },
          ]}
        >
          <Input.Password value={password} onChange={onChangePassword} />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 6,
            span: 16,
          }}
        >
          <Checkbox style={{}}>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 5,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" loading={false}>
            로그인
          </Button>
          <Link href="/signup">
            <Button>회원가입 </Button>
          </Link>
        </Form.Item>
      </FormWrapper>
    </>
  );
};

export default LoginForm;
