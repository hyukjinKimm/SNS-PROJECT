import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  List,
  Avatar,
  Input,
  Space,
  Button,
  Skeleton,
  Popover,
  Divider,
} from "antd";
import {
  EllipsisOutlined,
  RetweetOutlined,
  LoadingOutlined,
  HeartTwoTone,
  MessageOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import ImageSlider from "../ImageSlider";
import dayjs from "dayjs";
import {
  Overlay,
  Global,
  Header,
  CloseBtn,
  ImgWrapper,
  Indicator,
  SlickWrapper,
} from "./styles";
import {
  deletePost,
  editPost,
  likePost,
  unlikePost,
} from "../../reducers/post";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import CommentForm from "../CommentForm";
import Comment from "../Comment";
import UserProfilePostOption from "../UserProfilePostOption";
import * as postActions from "../../reducers/post";
const EditPost = ({ post, onClosePostEdit }) => {
  const { user, me, isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { likePostDone, editPostLoading, editPostDone, editPostError } =
    useSelector((state) => state.post);
  const [text, setText] = useState(post.content);
  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);
  const [flag, setFlag] = useState(false);

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
                  avatar={
                    <Avatar
                      src={"http://localhost:3065/img/" + post.User.src}
                    />
                  }
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
