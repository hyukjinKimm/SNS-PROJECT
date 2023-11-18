import { PlusOutlined } from "@ant-design/icons";
import React, { useState, useRef, useCallback } from "react";
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  Image,
  Row,
  Col,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addProfileImage } from "../reducers/user";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
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
const ProfileEdit = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const imageInput = useRef();
  const onChangeImages = useCallback((e) => {
    console.log(e);
    const imageData = new FormData();
    imageData.append("image", e.target.files[0]);
    dispatch(addProfileImage(imageData));
  });
  const onChangeImage = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);
  return (
    <>
      <Form
        labelCol={{
          span: 2,
        }}
        wrapperCol={{
          span: 10,
        }}
        layout="horizontal"
        style={{
          width: "60vw",
          marginTop: "30px",
          marginLeft: "3vw",
        }}
      >
        <Row style={{ marginBottom: "20px" }}>
          <Col>
            <div
              style={{
                marginLeft: "1vw",
                width: "9vw",
                height: "9vw",
                borderRadius: "70%",
                overflow: "hidden",
              }}
            >
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                width={"9vw"}
                height={"9vw"}
                src={"http://localhost:3065/img/" + me.src}
              />
            </div>
          </Col>
          <Col>
            <div
              style={{
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "30px",
                marginLeft: "20px",
                fontSize: "20px",
              }}
            >
              {me.nickname}
            </div>
            <input
              type="file"
              name="image"
              ref={imageInput}
              onChange={onChangeImages}
              style={{ display: "none" }}
            />

            <div
              style={{
                fontWeight: "bolder",
                textAlign: "center",
                marginTop: "30px",
                marginLeft: "20px",
                fontSize: "15px",
                cursor: "pointer",
              }}
              onClick={onChangeImage}
            >
              프로필 사진 바꾸기
            </div>
          </Col>
        </Row>
        <Form.Item label="닉네임">
          <Input maxLength={100} placeholder="youcancallmekimm" />
        </Form.Item>
        <Form.Item label="소개">
          <Input.TextArea
            showCount
            maxLength={200}
            placeholder={me.description}
            rows={5}
          />
        </Form.Item>
        <Form.Item label="성별">
          <Radio.Group>
            <Radio value="male"> 남성 </Radio>
            <Radio value="female"> 여성 </Radio>
            <Radio value="ohter"> 그 외 </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="생일">
          <DatePicker />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={false}>
            제출
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProfileEdit;
