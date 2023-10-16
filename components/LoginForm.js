import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { CHANGE_MENU } from "../reducers/screen";
import { useDispatch, useSelector } from "react-redux";
import { logInRequestAction } from "../reducers/user";
import { Button, Checkbox, Form, Input } from "antd";
import styled from "styled-components";

import { CHANGE_LOGIN_TO_SIGN_UP } from "../reducers/screen";
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
  const { isLoggingIn } = useSelector((state) => state.user);
  const { logInOrSignUp } = useSelector((state) => state.screen);

  const dispatch = useDispatch();
  const router = useRouter();

  const onFinish = useCallback(async (e) => {
    // e.preventDefault 적용 되어있음
    console.log("LogIn 실행");
    console.log(e, e.email, e.password);
    dispatch(logInRequestAction({ email: e.email, password: e.password }));
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
          <Button type="primary" htmlType="submit" loading={isLoggingIn}>
            로그인
          </Button>

          <Button
            onClick={() => {
              dispatch({ type: CHANGE_LOGIN_TO_SIGN_UP });
            }}
          >
            회원가입
          </Button>
        </Form.Item>
      </FormWrapper>
    </>
  );
};

export default LoginForm;
