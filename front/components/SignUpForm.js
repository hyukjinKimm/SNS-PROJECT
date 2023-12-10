import React, { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, Form, Input, Select, DatePicker } from "antd";
import { signUp } from "../reducers/user";

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
  const { signUpLoading, signUpDone, signUpError } = useSelector(
    (state) => state.user
  );
  const router = useRouter();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = useCallback((e) => {
    const { email, password, nickname, gender, birth } = e;
    dispatch(signUp({ email, password, nickname, gender, birth }));
  }, []);
  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
      return;
    } else if (signUpDone) {
      router.replace("/login");
      return;
    }
  }, [signUpDone, signUpError]);

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
              return Promise.reject(new Error("비밀번호가 일치하지 않습니다."));
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
        <Input />
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
    </Form>
  );
};
export default SignUp;
