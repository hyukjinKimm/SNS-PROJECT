import React, { useEffect, useState, useCallback } from "react";
import { Row, Col, List, Avatar, Input, Button } from "antd";
import ImageSlider from "../ImageSlider";
import dayjs from "dayjs";
import { Overlay, Header, CloseBtn } from "./styles";
import { editPost } from "../../reducers/post";
import { useDispatch, useSelector } from "react-redux";
import * as postActions from "../../reducers/post";
import { BACK_URL, FRONT_URL } from "../../url";

const EditPost = ({ post, onClosePostEdit }) => {
  const dispatch = useDispatch();
  const { editPostLoading, editPostDone, editPostError } = useSelector(
    (state) => state.post
  );
  const [text, setText] = useState(post.content);
  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onClickBtn = useCallback(() => {
    const data = { content: text, id: post.id };
    dispatch(editPost(data));
  }, [text]);

  useEffect(() => {
    if (editPostError) {
      alert(editPostError);
      onClosePostEdit();
    }
    if (editPostDone) {
      alert("게시글 수정 완료");
      onClosePostEdit();
      dispatch(postActions.editPostReset());
    }
  }, [editPostDone, editPostError]);
  const date = dayjs(post.createdAt);
  return (
    <>
      <Overlay>
        <Header>
          <CloseBtn onClick={onClosePostEdit}>X</CloseBtn>
        </Header>
        <Row
          style={{
            position: "relative",
            top: 0,
            left: "16%",
            backgroundPosition: "center",
          }}
        >
          <Col
            style={{
              textAlign: "center",
            }}
          >
            <ImageSlider images={post.Images} size={"35vw"} profile={true} />
          </Col>
          <Col
            style={{
              backgroundColor: "white",
              width: "40%",
            }}
          >
            <List
              style={{
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              <List.Item key={post.id}>
                <List.Item.Meta
                  avatar={<Avatar src={BACK_URL + "/img/" + post.User.src} />}
                  title={
                    <>
                      <a href={"/profile/" + post.User.nickname}>
                        {post.User.nickname}
                      </a>
                      <div
                        style={{
                          fontSize: "13px",
                          marginLeft: "4%",
                          display: "inline",
                          color: "#ced4da",
                        }}
                      >
                        {date.format("YY-MM-DD")}
                      </div>
                    </>
                  }
                />
              </List.Item>
            </List>
            <List
              style={{
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              <List.Item key={post.id}>
                <Input.TextArea
                  value={text}
                  onChange={onChangeText}
                  maxLength={200}
                  style={{ width: "100%", height: "30%" }}
                  rows={5}
                />
              </List.Item>
              <Button
                type="primary"
                onClick={onClickBtn}
                loading={editPostLoading}
                style={{ marginLeft: 20, marginTop: 10 }}
              >
                수정
              </Button>
            </List>
          </Col>
        </Row>
      </Overlay>
    </>
  );
};

export default EditPost;
