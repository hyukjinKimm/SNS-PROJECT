import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
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
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const FormDisabledDemo = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);
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
                width={"10vw"}
                height={"10vw"}
                src="https://cdn.pixabay.com/photo/2023/10/30/16/56/euonymus-europaeus-8353310_1280.jpg"
              />
            </div>
          </Col>
          <Col>
            <div
              style={{
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "10px",
                marginLeft: "20px",
                fontSize: "20px",
              }}
            >
              youcancallmekimm
            </div>
            <div
              style={{
                fontWeight: "bolder",
                textAlign: "center",
                marginTop: "30px",
                marginLeft: "20px",
                fontSize: "15px",
              }}
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
            placeholder="오늘은 어떤 행복한 일이 있었나요?"
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
      </Form>
    </>
  );
};
export default () => <FormDisabledDemo />;
