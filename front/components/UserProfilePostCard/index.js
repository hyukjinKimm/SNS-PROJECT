import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  List,
  Avatar,
  Space,
  Button,
  Skeleton,
  Popover,
  Divider,
} from "antd";
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
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import CommentForm from "../CommentForm";
import Comment from "../Comment";

const UserProfilePostCard = ({ post, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user } = useSelector((state) => state.user);
  const { addCommentDone } = useSelector((state) => state.post);
  const data = dayjs(post.createdAt);

  useEffect(() => {
    if (addCommentDone) {
    }
  }, []);
  return (
    <>
      <Overlay>
        <Header>
          <CloseBtn onClick={onClose}>X</CloseBtn>
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
                    <Avatar src={"http://localhost:3065/img/" + user.src} />
                  }
                  title={
                    <>
                      <a href={"/profile/" + user.nickname}>{user.nickname}</a>
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
                <List.Item.Meta
                  avatar={
                    <Avatar src={"http://localhost:3065/img/" + user.src} />
                  }
                  title={
                    <>
                      <a href={"/profile/" + user.nickname}>{user.nickname}</a>
                      <br />
                      <div
                        style={{
                          fontSize: "13px",
                          display: "inline",
                          color: "#ced4da",
                          fontFamily: "sans-sherif",
                        }}
                      >
                        {data.format("YY-MM-DD")}
                      </div>
                    </>
                  }
                  description={post.content}
                />
              </List.Item>
            </List>

            <div
              style={{
                height: "1px",
                background: "#ced4da",
              }}
            ></div>

            <div
              id="scrollableDiv"
              style={{
                height: 400,
                overflow: "auto",
                padding: "0 16px",
                border: "1px solid rgba(140, 140, 140, 0.35)",
              }}
            >
              <InfiniteScroll
                dataLength={post.Comments.length}
                loader={
                  <Skeleton
                    avatar
                    paragraph={{
                      rows: 1,
                    }}
                    active
                  />
                }
                scrollableTarget="scrollableDiv"
                endMessage={<Divider plain>댓글의 끝 입니다. 🤐</Divider>}
              >
                <List
                  dataSource={post.Comments}
                  renderItem={(comment) => (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      postId={post.id}
                    />
                  )}
                />
              </InfiniteScroll>
            </div>
            <CommentForm postId={post.id} />
          </Col>
        </Row>
      </Overlay>
    </>
  );
};

export default UserProfilePostCard;
