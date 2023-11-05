import React, { use, useCallback, useEffect, useRef } from "react";
import { Button, Form, Select, Upload, Input } from "antd";
import ImgCrop from "antd-img-crop";
import { PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addPostRequestAction, addImageRequestAction } from "../reducers/post";

const normFile = (e) => {
  console.log("Upload event:", e.fileList);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
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
  const { me } = useSelector((state) => state.user);
  const { addPostLoading, addPostDone, addPostError, imagePaths } = useSelector(
    (state) => state.post
  );
  const setText = useCallback(() => {
    formRef.current?.setFieldsValue({
      content: "",
    });
  }, []);
  useEffect(() => {
    if (addPostDone) {
      setText("");
    }
  }, [addPostDone]);
  const formRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const onFinish = useCallback(
    (e) => {
      const data = new FormData();
      data.append("content", e.content);
      imagePaths.forEach((i) => {
        data.append("image", i);
      });
      dispatch(addPostRequestAction(data));
    },

    [imagePaths]
  );
  const onChangeImage = useCallback((e) => {
    if (e.file.status == "done") {
      const data = new FormData();
      data.append("image", e.file.originFileObj);
      dispatch(addImageRequestAction(data));
    } else if (e.file.status == "removed") {
      // ImagePasth 삭제 부분
      console.log("삭제 여기", e);
    }
  });

  useEffect(() => {
    if (addPostError) {
      alert(addPostError);
    }
  }, [addPostError]);
  const [form] = Form.useForm();

  return (
    <Form
      ref={formRef}
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
        name="images"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <ImgCrop rotationSlider>
          <Upload
            listType="picture-card"
            accept="image/png, image/jpeg"
            maxCount={5}
            onChange={onChangeImage}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </ImgCrop>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" loading={addPostLoading}>
          만들기
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Post;
