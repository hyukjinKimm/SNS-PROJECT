import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, Form, Input, Select, DatePicker } from "antd";
import {
  signUp,
  emailCheck,
  emailVarification,
  passwordReset,
} from "../reducers/user";
import { wrapper } from "../store/configureStore";
import { getMyInfo } from "../reducers/user";
import * as screenActions from "../reducers/screen";
import useSWR from "swr";
import axios from "axios";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
    md: {
      offset: 0,
      span: 30,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
    md: {
      offset: 0,
      span: 10,
    },
  },
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
      offset: 6,
    },
  },
};

const findPassword = () => {
  const {
    signUpLoading,
    signUpDone,
    signUpError,
    emailCheckLoading,
    emailCheckDone,
    emailVarificationLoading,
    emailVarificationDone,
    emailVarificationError,
    emailCheckError,
    passwordResetDone,
    passwordResetError,
  } = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const onChangeNumber = useCallback((e) => {
    setNumber(e.target.value);
  }, []);
  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  useEffect(() => {
    if (emailCheckError) {
      alert(emailCheckError);
      return;
    }
  }, [emailCheckError]);
  const onFinish = useCallback(
    (e) => {
      if (!emailVarificationDone) {
        alert("이메일 인증을 완료해 주세요");
        return;
      }
      const { email, password } = e;
      dispatch(passwordReset({ email, password }));
    },
    [emailVarificationDone]
  );
  useEffect(() => {
    if (passwordResetError) {
      alert("잠시후 다시 시도해 주세요");
      return;
    }
    if (passwordResetDone) {
      alert("비밀번호가 변경 되었습니다.");
      router.replace("/");
      return;
    }
  }, [passwordResetDone, passwordResetError]);
  return (
    <Form
      {...formItemLayout}
      form={form}
      onFinish={onFinish}
      name="findPassword"
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "86",
      }}
      style={{
        maxWidth: 600,
        marginTop: 40,
        marginLeft: 10,
        marginRight: 10,
      }}
      scrollToFirstError
    >
      {(values, formInstance) => {
        return (
          <>
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
            >
              <Input
                value={email}
                onChange={onChangeEmail}
                disabled={emailCheckDone}
              />
            </Form.Item>

            <Button
              onClick={() => {
                dispatch(emailCheck({ email }));
              }}
              style={{
                marginBottom: 10,
                marginLeft: 200,
              }}
              loading={emailCheckLoading}
              disabled={emailVarificationDone}
            >
              인증 번호 전송
            </Button>
            {emailCheckDone && (
              <div style={{ marginLeft: 200 }}>
                <Input
                  type="number"
                  placeholder="인증번호를 입력해주세요(제한시간 1분)"
                  value={number}
                  onChange={onChangeNumber}
                  disabled={emailVarificationDone}
                ></Input>
                <Button
                  style={{ marginTop: 10 }}
                  onClick={() => {
                    dispatch(emailVarification({ number }));
                  }}
                  disabled={emailVarificationDone}
                >
                  인증하기
                </Button>
                {emailVarificationDone ? (
                  <div
                    style={{
                      display: "inline",
                      fontSize: 11,
                      color: "blue",
                      marginLeft: 10,
                    }}
                  >
                    이메일 인증 완료
                  </div>
                ) : null}
                {emailVarificationError ? (
                  <div
                    style={{
                      display: "inline",
                      fontSize: 11,
                      color: "red",
                      marginLeft: 10,
                    }}
                  >
                    이메일 인증 실패
                  </div>
                ) : null}
              </div>
            )}
            {emailVarificationDone ? (
              <>
                <Form.Item
                  name="password"
                  label="새로운 비밀번호"
                  rules={[
                    {
                      required: true,
                      message: "비밀번호를 입력해 주세요",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  name="passwordcheck"
                  label="비밀번호 확인"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "비밀번호 확인을 진행해 주세요",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("비밀번호가 일치하지 않습니다.")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    제출하기
                  </Button>
                </Form.Item>
              </>
            ) : null}
          </>
        );
      }}
    </Form>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";

      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }

      await store.dispatch(getMyInfo());
      store.dispatch(screenActions.changeMenu("HOME"));

      return {
        props: {},
      };
    }
);

export default findPassword;
