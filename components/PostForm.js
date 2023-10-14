import React, { useCallback } from "react";
import {
  Button,
  Checkbox,
  Col,
  ColorPicker,
  Form,
  InputNumber,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Space,
  Switch,
  Upload,
  Input,
} from "antd";
import { InboxOutlined, UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

import { useDispatch } from "react-redux";
import { addPost } from "../reducers/post";
const { Option } = Select;

const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
    md: {
      offset: 1,
      span: 2,
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
const Post = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const onFinish = useCallback((e) => {
    console.log(e);
    dispatch(addPost(e));
    dispatch({ type: "CHANGE_MENU", data: "HOME" });
    router.push("/");
  }, []);
  const [form] = Form.useForm();

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="post"
      style={{
        marginTop: 40,
        marginLeft: 10,
        marginRight: 10,
      }}
      scrollToFirstError
      onFinish={onFinish}
    >
      <Form.Item
        name="content"
        label="게시글"
        rules={[
          {
            required: true,
            message: "내용을 입력해 주세요.",
          },
        ]}
      >
        <Input.TextArea
          showCount
          maxLength={200}
          placeholder="오늘은 어떤 행복한 일이 있었나요?"
          rows={5}
        />
      </Form.Item>

      <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload listType="picture-card">
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          만들기
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Post;
