import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, Form, Input, Select, DatePicker } from "antd";
import { signUp, emailCheck, emailVarification } from "../reducers/user";
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

const SignUp = () => {
  const {
    signUpLoading,
    signUpDone,
    signUpError,
    emailCheckLoading,
    emailCheckDone,
    emailVarificationLoading,
    emailVarificationDone,
    emailVarificationError,
  } = useSelector((state) => state.user);

  const router = useRouter();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [emailExistChecked, setEmailExistChecked] = useState(false);
  const [nicknameExistChecked, setNicknameExistChecked] = useState(false);
  const onFinish = useCallback(
    (e) => {
      console.log(emailExistChecked);
      if (!emailExistChecked) {
        alert("이메일 중복확인을 해주세요");
        return;
      }
      if (!nicknameExistChecked) {
        alert("닉네임 중복확인을 해주세요");
        return;
      }
      if (!emailVarificationDone) {
        alert("이메일 인증을 완료해 주세요");
        return;
      }
      const { email, password, nickname, gender, birth } = e;
      dispatch(signUp({ email, password, nickname, gender, birth }));
    },
    [emailExistChecked, nicknameExistChecked, emailVarificationDone]
  );
  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
      return;
    } else if (signUpDone) {
      router.push("/login");
      return;
    }
  }, [signUpDone, signUpError]);
  const [number, setNumber] = useState("");
  const onChangeNumber = useCallback((e) => {
    setNumber(e.target.value);
  }, []);
  const [emailExistCheckedLoading, setEmailExistCheckedLoading] =
    useState(false);

  const [emailExistMessage, setEmailExistMessage] = useState("");
  const [messageColor, setMessageColor] = useState("blue");

  const [NicknameMessageColor, setNicknameMessageColor] = useState("blue");
  const [email, setEmail] = useState("");
  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
    setEmailExistMessage("");
  }, []);
  const onClickEmailExist = useCallback(
    async (email, error) => {
      if (error.length > 0 || email.length == 0) return;
      setEmailExistCheckedLoading(true);
      const data = await axios
        .post(
          "http://localhost:3065/user/emailExistCheck",
          { email },
          { withCredentials: true }
        )
        .then((response) => {
          console.log("ye");
          setEmailExistMessage(response.data.message);
          setMessageColor("blue");
          setEmailExistChecked(true);
          console.log(emailExistChecked);
          setEmailExistCheckedLoading(false);
        })
        .catch((err) => {
          setEmailExistMessage(err.response.data);
          setMessageColor("red");
          setEmailExistCheckedLoading(false);
        });
    },
    [emailExistChecked]
  );
  const [nickname, setNickname] = useState("");
  const [nicknameExistMessage, setNicknameExistMessage] = useState("");
  const onChangeNickname = useCallback((e) => {
    setNickname(e.target.value);
    setNicknameExistMessage("");
    setNicknameExistChecked(false);
  }, []);
  const onClickNicknameExist = useCallback(async (nickname, error) => {
    if (error.length > 0 || nickname.length == 0) return;
    const data = await axios
      .post(
        "http://localhost:3065/user/nicknameExistCheck",
        { nickname },
        { withCredentials: true }
      )
      .then((response) => {
        setNicknameExistMessage(response.data.message);
        setNicknameMessageColor("blue");
        setNicknameExistChecked(true);
      })
      .catch((err) => {
        setNicknameExistMessage(err.response.data);
        setNicknameMessageColor("red");
        setNicknameExistChecked(false);
      });
  }, []);
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="signup"
      onFinish={onFinish}
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
              <div>
                <Input
                  value={email}
                  onChange={onChangeEmail}
                  disabled={emailExistChecked}
                />
                <Button
                  style={{ marginTop: 10 }}
                  onClick={() => {
                    onClickEmailExist(
                      email,
                      formInstance.getFieldError("email")
                    );
                  }}
                  loading={emailExistCheckedLoading}
                  disabled={emailExistChecked}
                >
                  중복확인
                </Button>

                {
                  <div
                    style={{
                      display: "inline",
                      fontSize: 11,
                      color: messageColor,
                      marginLeft: 10,
                    }}
                  >
                    {emailExistMessage}
                  </div>
                }
              </div>
            </Form.Item>
            {emailExistChecked && (
              <Button
                onClick={() => {
                  setNumber("");
                  dispatch(emailCheck({ email }));
                }}
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  marginLeft: 200,
                }}
                loading={emailCheckLoading}
                disabled={emailVarificationDone}
              >
                인증 번호 전송
              </Button>
            )}
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
                    {emailVarificationError}
                  </div>
                ) : null}
              </div>
            )}
            <Form.Item
              name="password"
              label="비밀번호"
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
            <Form.Item
              name="nickname"
              label="닉네임"
              tooltip="당신의 별명은 무엇인가요?"
              rules={[
                {
                  required: true,
                  message: "닉네임을 입력해 주세요.",
                  whitespace: true,
                },
              ]}
            >
              <div>
                <Input value={nickname} onChange={onChangeNickname} />
                <Button
                  onClick={() => {
                    onClickNicknameExist(
                      nickname,
                      formInstance.getFieldError("nickname")
                    );
                  }}
                >
                  중복확인
                </Button>
                {
                  <div
                    style={{
                      display: "inline",
                      fontSize: 11,
                      color: NicknameMessageColor,
                      marginLeft: 10,
                    }}
                  >
                    {nicknameExistMessage}
                  </div>
                }
              </div>
            </Form.Item>
            <Form.Item
              name="gender"
              label="성별"
              rules={[
                {
                  required: true,
                  message: "성별을 선택해 주세요.",
                },
              ]}
            >
              <Select placeholder="성별">
                <Option value="male">남자</Option>
                <Option value="female">여자</Option>
                <Option value="other">그 외</Option>
              </Select>
            </Form.Item>
            <Form.Item label="생일" name="birth">
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="confirm"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("약관 동의는 필수 입니다")),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                나는 <a href="">약관</a> 에 동의합니다.
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" loading={signUpLoading}>
                가입하기
              </Button>
            </Form.Item>
          </>
        );
      }}
    </Form>
  );
};

export default SignUp;
