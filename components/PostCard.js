import {
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
  RetweetOutlined,
  HeartOutlined,
  HeartTwoTone,
} from "@ant-design/icons";
import React, { useCallback, useState } from "react";
import { Avatar, List, Space } from "antd";
import ImageSlider from "./ImageSlider";

const RetweetIcon = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const LikeIcon = ({ text, liked, onToggleLike }) => (
  <Space>
    {liked
      ? React.createElement(HeartTwoTone, {
          twoToneColor: "#eb2f96",
          onClick: () => {
            onToggleLike();
          },
        })
      : React.createElement(HeartOutlined, {
          onClick: () => {
            onToggleLike();
          },
        })}
    {text}
  </Space>
);
const CommentIcon = ({ icon, text, commentOpened, onToggleComment }) => (
  <Space>
    {React.createElement(icon, {
      onClick: () => {
        onToggleComment();
      },
    })}
    {text}
  </Space>
);
const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [commentOpened, setCommentOpened] = useState(false);

  const onToggleLike = useCallback(() => {
    setLiked(!liked);
  }, [liked]);
  const onToggleComment = useCallback(() => {
    setCommentOpened(!commentOpened);
  }, [commentOpened]);
  return (
    <>
      <List.Item
        key={post.id}
        actions={[
          <RetweetIcon
            icon={RetweetOutlined}
            text="156"
            key="list-vertical-retweet-o"
          />,
          <LikeIcon
            text="156"
            liked={liked}
            onToggleLike={onToggleLike}
            key="list-vertical-like-o"
          />,
          <CommentIcon
            icon={MessageOutlined}
            text="2"
            commentOpened={commentOpened}
            onToggleComment={onToggleComment}
            key="list-vertical-comment"
          />,
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar>{post.User.nickname[0]} </Avatar>}
          title={<a href={post.User.nickname}>{post.User.nickname}</a>}
          description={post.description}
        />
        <ImageSlider images={post.Images} />
        <div>{post.content}</div>
      </List.Item>
      {commentOpened ? <div>댓글부분</div> : null}
    </>
  );
};
export default PostCard;
