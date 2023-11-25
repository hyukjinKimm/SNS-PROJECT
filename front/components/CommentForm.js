import React, { useCallback, useEffect, useState, useRef } from "react";
import { Button, Form, Input } from "antd";
import { addComment } from "../reducers/post";

import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../reducers/user";

const CommentForm = ({ postId }) => {
  const formRef = useRef(null);
  const [addCommentLoading, setAddCommentLoading] = useState(false);
  const { addCommentDone, addCommentError } = useSelector(
    (state) => state.post
  );
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const setComment = useCallback(() => {
    formRef.current?.setFieldsValue({
      content: "",
    });
  }, []);

  useEffect(() => {
    if (addCommentDone && addCommentLoading) {
      setAddCommentLoading(false);
      setComment();

      if (user) {
        dispatch(getUserInfo(user.nickname));
      }
    }
    return;
  }, [addCommentDone, user]);
  useEffect(() => {
    if (addCommentError) {
      alert(addCommentError);
    }
  }, [addCommentError]);

  const onFinish = (values) => {
    console.log("Received values from form: ", values.comment);
    const data = {
      ...values,
      postId: postId,
    };

    setAddCommentLoading(true);
    dispatch(addComment(data));
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
        style={{ width: "60%" }}
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
