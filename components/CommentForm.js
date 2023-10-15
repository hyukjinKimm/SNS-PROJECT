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

import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../reducers/post";
const { Option } = Select;

const Post = () => {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    console.log("Received values from form: ", values.comment);
    dispatch({
      type: "ADD_COMMENT",
      data: { User: { id: 1, nickname: "zzzzz" }, content: values.comment },
    });
  };

  return (
    <Form
      name="customized_form_controls"
      layout="inline"
      onFinish={onFinish}
      style={{ margin: "20px" }}
    >
      <Form.Item
        name="comment"
        label="댓글"
        style={{ width: "60vw" }}
        wrapperCol={{
          offset: 0,
          span: 40,
        }}
      >
        <Input.TextArea
          showCount
          maxLength={200}
          placeholder="댓글작성"
          rows={2}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          작성
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Post;