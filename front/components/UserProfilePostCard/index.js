import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, List, Avatar } from "antd";
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
import { useSelector } from "react-redux";
import CommentForm from "../CommentForm";
import Comment from "../Comment";

const UserProfilePostCard = ({ post, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user } = useSelector((state) => state.user);
  const data = dayjs(post.createdAt);

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
              width: "30%",
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

            <List
              style={{
                marginLeft: "10px",
                marginRight: "10px",
              }}
              className="demo-loadmore-list"
              itemLayout="vertical"
              dataSource={post.Comments}
              renderItem={(comment) => (
                <Comment key={comment.id} comment={comment} postId={post.id} />
              )}
            />
            <CommentForm />
          </Col>
        </Row>
      </Overlay>
    </>
  );
};

export default UserProfilePostCard;
