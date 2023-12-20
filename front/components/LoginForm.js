import React, { useCallback, useEffect } from "react";

import * as screenActions from "../reducers/screen";
import * as userActions from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../reducers/user";
import { Button, Checkbox, Form, Input } from "antd";
import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
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
  const router = useRouter();
  const { logInLoading, logInError, logInDone } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);
  useEffect(() => {
    if (logInDone) {
      router.push("/");
    }
  }, [logInDone]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.initializeUserState());
  }, []);
  const onFinish = useCallback(async (e) => {
    // e.preventDefault 적용 되어있음
    dispatch(logIn({ email: e.email, password: e.password }));
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
          wrapperCol={{
            offset: 1,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" loading={logInLoading}>
            로그인
          </Button>

          <Button
            onClick={() => {
              dispatch(screenActions.changeLogInToSignUp(false));
            }}
          >
            회원가입
          </Button>
          <a href="http://localhost:3060/findPassword">비밀번호 찾기</a>
        </Form.Item>

        <div>
          <a id="custom-login-btn" href="http://localhost:3065/auth/kakao">
            <img src="/kakao-login-btn.png" width="200px" />
          </a>
        </div>
        <div>
          <a id="custom-login-btn" href="http://localhost:3065/auth/naver">
            <img src="/naver-login-btn.png" width="200px" />
          </a>
        </div>
        <div>
          <div
            id="custom-login-btn"
            onClick={useCallback(() => {
              alert("기능 점검 중입니다.");
            }, [])}
          >
            <img src="/google-login-btn.png" width="200px" />
          </div>
        </div>
      </FormWrapper>
    </>
  );
};

export default LoginForm;
