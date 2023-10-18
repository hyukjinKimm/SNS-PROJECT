import React, { useCallback, useEffect, useState, useRef } from "react";
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
import {
  addCommentRequest,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from "../reducers/post";
import { InboxOutlined, UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../reducers/post";
import useInput from "../hooks/useInput";
const { Option } = Select;

const CommentForm = ({ postId }) => {
  const formRef = useRef(null);
  const [addCommentLoading, setAddCommentLoading] = useState(false);
  const { addCommentDone } = useSelector((state) => state.post);

  const dispatch = useDispatch();
  const setComment = useCallback(() => {
    formRef.current?.setFieldsValue({
      content: "",
    });
  }, []);

  useEffect(() => {
    if (addCommentDone) {
      setAddCommentLoading(false);
      setComment();
    }
    return;
  }, [addCommentDone]);

  const onFinish = (values) => {
    console.log("Received values from form: ", values.comment);
    const data = {
      ...values,
      postId: postId,
    };

    setAddCommentLoading(true);
    dispatch(addCommentRequest(data));
  };

  return (
    <Form
      ref={formRef}
      name="customized_form_controls"
      layout="inline"
      onFinish={onFinish}
      style={{ margin: "20px" }}
    >
      <Form.Item
        name="content"
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
          allowClear={true}
        />
      </Form.Item>
      <Form.Item>
        <Button
          key={postId}
          type="primary"
          htmlType="submit"
          loading={addCommentLoading}
        >
          작성
        </Button>
      </Form.Item>
    </Form>
  );
};
export default CommentForm;
