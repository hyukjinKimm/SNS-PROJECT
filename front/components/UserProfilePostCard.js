import React, { useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  SettingOutlined,
  TableOutlined,
  HeartFilled,
  MessageFilled,
} from "@ant-design/icons";
import {
  Image,
  Row,
  Col,
  Card,
  Layout,
  theme,
  Button,
  Avatar,
  Space,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Follow, unFollow } from "../reducers/user";
const { Meta } = Card;
const { Content } = Layout;

const UserProfilePostCard = ({ post }) => {
  const { me, followLoading, user, followError } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const onClickFollow = useCallback(() => {
    dispatch(Follow(user.id));
  }, [user]);
  const onClickunFollow = useCallback(() => {
    dispatch(unFollow(user.id));
  }, [user]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    if (followError) {
      alert(followError);
    }
  }, [followError]);
  const division = useCallback((arr, n) => {
    const copy = [...arr];
    const length = arr.length;
    const divide =
      Math.floor(length / n) + (Math.floor(length % n) > 0 ? 1 : 0);
    const newArray = [];

    for (let i = 0; i <= divide; i++) {
      // 배열 0부터 n개씩 잘라 새 배열에 넣기
      newArray.push(copy.splice(0, n));
    }

    return newArray;
  }, []);
  const result = user?.Posts.length > 0 ? division(user?.Posts, 3) : [];
  const imgCoverStyle = useMemo(() => {
    return {};
  }, []);
  const handleMouseOver = useCallback((e) => {
    console.log(e.target);
    console.log("in");
  }, []);
  const handleMouseOut = useCallback((e) => {
    console.log("out");
  }, []);
  return (
    <Col
      xs={24}
      md={8}
      style={{
        position: "relative",
        width: "10vw",
        height: "30vh",
        cursor: "pointer",
      }}
    >
      <img
        style={{ width: "90%", height: "90%" }}
        src={"http://localhost:3065/img/" + post.Images[0].src}
      ></img>
      <div
        style={{
          position: "absolute",
          left: "5px",
          top: "0px",
          width: "87%",
          height: "90%",
          textAlign: "center",
          lineHeight: "30vh",
          background: "black",
          color: "white",
          opacity: "0.6",
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <Space style={{ marginRight: "10px" }}>
          {React.createElement(MessageFilled)}
          {post.Comments.length}
        </Space>

        <Space>
          {React.createElement(HeartFilled)}
          {post.PostLikers.length}
        </Space>
      </div>
    </Col>
  );
};

export default UserProfilePostCard;
