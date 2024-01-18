import React, { useCallback, useState } from "react";
import { HeartFilled, MessageFilled } from "@ant-design/icons";
import { Col } from "antd";
import UserProfilePostCard from "./UserProfilePostCard";
import { BACK_URL, FRONT_URL } from "../url";

const UserProfilePostImage = ({ post }) => {
  const [isSwitched, setIsSwitched] = useState(false);
  const handleMouseOver = useCallback(
    (e) => {
      if (!isSwitched) {
        setIsSwitched(true);
      }
    },
    [isSwitched]
  );
  const handleMouseOut = useCallback(
    (e) => {
      if (isSwitched) {
        setIsSwitched(false);
      }
    },
    [isSwitched]
  );
  const [showPost, setShowPost] = useState(false);
  const onClickPost = useCallback((e) => {
    setShowPost(true);
  }, []);
  const onClosePost = useCallback(() => {
    setShowPost(false);
  }, []);

  return (
    <>
      <Col
        xs={24}
        md={8}
        style={{
          position: "relative",
          width: "10vw",
          height: "40vh",
        }}
      >
        <img
          style={{ width: "90%", height: "90%" }}
          src={BACK_URL + "/img/" + post.Images[0].src}
        ></img>
        <div
          style={{
            position: "absolute",
            left: "5px",
            top: "0px",
            width: "87%",
            height: "90%",
            textAlign: "center",
            lineHeight: "35vh",
            background: "black",
            color: "white",
            opacity: isSwitched ? "0.7" : "0",
            cursor: "pointer",
            zIndex: 1,
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onClick={onClickPost}
        >
          <div style={{ zIndex: -1000 }}>
            <MessageFilled style={{ fontSize: "20px", marginRight: "10px" }} />
            {post.Comments.length}
            <HeartFilled
              style={{
                fontSize: "20px",
                marginLeft: "15px",
                marginRight: "10px",
              }}
            />
            {post.PostLikers.length}
          </div>
        </div>
      </Col>
      {showPost && <UserProfilePostCard post={post} onClose={onClosePost} />}
    </>
  );
};

export default UserProfilePostImage;
