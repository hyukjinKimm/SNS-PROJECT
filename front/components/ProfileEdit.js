import Head from "next/head";
import React, { useRef, useCallback, useEffect } from "react";
import { Button, Form, Input, Image, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addProfileImage, profileEdit } from "../reducers/user";
import { useRouter } from "next/router";
import { BACK_URL, FRONT_URL } from "../url";

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
  const dispatch = useDispatch();
  const route = useRouter();
  const {
    me,
    profileImagePath,
    profileEditDone,
    profileEditLoading,
    profileEditError,
  } = useSelector((state) => state.user);
  const onFinish = useCallback(
    (e) => {
      const { nickname, description } = e;
      const data = {
        nickname,
        description,
        src: profileImagePath,
      };
      dispatch(profileEdit(data));
    },
    [profileImagePath]
  );

  const imageInput = useRef();
  const onChangeImages = useCallback((e) => {
    const imageData = new FormData();
    imageData.append("image", e.target.files[0]);
    dispatch(addProfileImage(imageData));
  });
  const onChangeImage = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);
  useEffect(() => {
    if (profileEditDone) {
      route.push("/");
      return;
    }
  }, [profileEditDone]);
  useEffect(() => {
    if (profileEditError) {
      alert(profileEditError);
      return;
    }
  }, [profileEditError]);
  return (
    <>
      <Head>
        <title>설정 | SNS-PROJECT</title>
      </Head>
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
        onFinish={onFinish}
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
                src={BACK_URL + "/img/" + me.src}
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
        <Form.Item label="닉네임" name="nickname">
          <Input maxLength={100} placeholder={me.nickname} />
        </Form.Item>
        <Form.Item label="소개" name="description">
          <Input.TextArea
            showCount
            maxLength={200}
            placeholder={me.description}
            rows={5}
          />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={profileEditLoading}>
            제출
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProfileEdit;
