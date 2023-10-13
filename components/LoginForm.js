import React, { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useDispatch } from "react-redux";
import { logInAction } from "../reducers/user";
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
const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const onFinish = useCallback((e) => {
    // e.preventDefault 적용 되어있음
    console.log("LogIn 실행");
    console.log(e, e.email, e.password);
    dispatch(logInAction({ email: e.email, password: e.password }));
    dispatch({
      type: "CHANGE_MENU",
      data: "HOME",
    });
    router.push("/");
  }, []);
  return (
    <>
      <FormWrapper
        labelCol={{
          span: 4,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "유요한 이메일이 아닙니다.",
            },
            {
              required: true,
              message: "이메일을 입력해 주세요.",
            },
          ]}
          labelCol={{
            offset: 0,
            span: 3,
          }}
          wrapperCol={{
            offset: 0,
            span: 10,
          }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="비밀번호"
          name="password"
          rules={[
            {
              required: true,
              message: "비밀번호를 입력해 주세요",
            },
          ]}
          wrapperCol={{
            offset: 0,
            span: 10,
          }}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 1,
            span: 10,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 1,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" loading={false}>
            로그인
          </Button>
          <Link href="/signup">
            <Button>
              <Link href="/signup">회원가입</Link>
            </Button>
          </Link>
        </Form.Item>
      </FormWrapper>
    </>
  );
};

export default LoginForm;
