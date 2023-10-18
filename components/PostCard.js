import {
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
  RetweetOutlined,
  HeartOutlined,
  HeartTwoTone,
  EllipsisOutlined,
} from "@ant-design/icons";
const count = 3;
import React, { useCallback, useState, useEffect } from "react";
import { Avatar, List, Space, Button, Skeleton, Popover } from "antd";
import ImageSlider from "./ImageSlider";
import CommentForm from "./CommentForm";
import { deletePostRequestAction } from "../reducers/post";
import { useDispatch, useSelector } from "react-redux";
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

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
  const { me } = useSelector((state) => state.user);
  const [deletePostLoading, setDeletePostLoading] = useState(false);
  const { deletePostDone, deletePostError } = useSelector(
    (state) => state.post
  );
  useEffect(() => {
    if (deletePostDone) {
      setDeletePostLoading(false);
    }
    return;
  }, [deletePostDone]);
  const onDelete = useCallback((e) => {
    setDeletePostLoading(true);

    dispatch(deletePostRequestAction(post.id));
  }, []);
  const id = useSelector((state) => state.user.me?.id);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const [liked, setLiked] = useState(false);
  const [commentOpened, setCommentOpened] = useState(false);

  const onToggleLike = useCallback(() => {
    setLiked(!liked);
  }, [liked]);
  const onToggleComment = useCallback(() => {
    setCommentOpened(!commentOpened);
  }, [commentOpened]);

  console.log(id, post.Comments);

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
        extra={
          post.User.id === me?.id ? (
            <Popover
              placement="left"
              content={
                <Space>
                  <Button type="primary" onClick={hide}>
                    수정
                  </Button>
                  <Button danger onClick={onDelete} loading={deletePostLoading}>
                    삭제
                  </Button>
                  <Button onClick={hide}>신고</Button>
                  <Button onClick={hide}>닫기</Button>
                </Space>
              }
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
            >
              <EllipsisOutlined style={{ fontSize: "40px" }} />
            </Popover>
          ) : null
        }
      >
        <List.Item.Meta
          avatar={<Avatar>{post.User.nickname[0]} </Avatar>}
          title={<a href={post.User.nickname}>{post.User.nickname}</a>}
          description={post.description}
        />
        {post.Images && <ImageSlider images={post.Images} />}
        <div>{post.content}</div>
      </List.Item>

      {commentOpened ? (
        <List.Item>
          {post.Comments.length} 개의 댓글
          {post.Comments.length > 0 && (
            <List
              className="demo-loadmore-list"
              itemLayout="vertical"
              dataSource={post.Comments}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <div>좋아요 {22}개</div>,
                    <div>답글달기</div>,
                    item.User.id === id && (
                      <a key="list-loadmore-edit"> 수정하기</a>
                    ),
                    item.User.id === id && (
                      <a key="list-loadmore-delete"> 삭제하기</a>
                    ),
                  ].filter((element) => {
                    if (element) return true;
                  })}
                  extra={[<HeartOutlined />]}
                >
                  <List.Item.Meta
                    avatar={<Avatar> {item.User.nickname[0]}</Avatar>}
                    description={item.content}
                  />
                </List.Item>
              )}
            />
          )}
          <CommentForm postId={post.id} />
        </List.Item>
      ) : null}
    </>
  );
};
export default PostCard;
