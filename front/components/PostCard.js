import React, { useCallback, useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  MessageOutlined,
  RetweetOutlined,
  HeartOutlined,
  HeartTwoTone,
  EllipsisOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Avatar, List, Space, Button, Skeleton, Popover } from "antd";
import ImageSlider from "./ImageSlider";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { deletePost, likePost, unlikePost } from "../reducers/post";
import { useDispatch, useSelector } from "react-redux";
const PostCard = ({ post }) => {
  const { me, isLoggedIn } = useSelector((state) => state.user);
  const [deletePostLoading, setDeletePostLoading] = useState(false);
  const { deletePostDone, likePostDone } = useSelector((state) => state.post);
  useEffect(() => {
    if (deletePostDone) {
      setDeletePostLoading(false);
    }
    return;
  }, [deletePostDone]);
  const onDelete = useCallback((e) => {
    if (confirm("게시글을 삭제 하시겠습니까?")) {
      setDeletePostLoading(true);

      dispatch(deletePost(post.id));
    }
  }, []);
  const id = useSelector((state) => state.user.me?.id);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = useCallback((newOpen) => {
    setOpen(newOpen);
  }, []);
  const [liked, setLiked] = useState(false);
  const [likePostLoading, setLikePostLoading] = useState(false);
  const [commentOpened, setCommentOpened] = useState(false);

  const onToggleLike = useCallback(() => {
    if (!me) {
    }
    setLiked(!liked);
    setLikePostLoading(true);
    if (!liked) {
      dispatch(likePost({ postId: post.id }));
    } else {
      dispatch(unlikePost({ postId: post.id }));
    }
  }, [liked]);

  useEffect(() => {
    if (likePostDone) {
      setLikePostLoading(false);
    }
  }, [likePostDone]);

  useEffect(() => {
    if (
      post?.PostLikers?.find((e) => {
        if (e.id == me?.id) {
          return true;
        }
      })
    ) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [me]);

  const RetweetIcon = useCallback(({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  ));
  const LikeIcon = useCallback(
    ({ text, liked, onToggleLike }) =>
      likePostLoading ? (
        <LoadingOutlined />
      ) : (
        <Space>
          {liked
            ? React.createElement(HeartTwoTone, {
                twoToneColor: "#eb2f96",
                onClick: isLoggedIn
                  ? () => {
                      onToggleLike();
                    }
                  : null,
              })
            : React.createElement(HeartOutlined, {
                onClick: isLoggedIn
                  ? () => {
                      onToggleLike();
                    }
                  : null,
              })}
          {text}
        </Space>
      ),
    [liked, likePostLoading, isLoggedIn]
  );
  const CommentIcon = useCallback(
    ({ icon, text, commentOpened, onToggleComment }) => (
      <Space>
        {React.createElement(icon, {
          onClick: () => {
            onToggleComment();
          },
        })}
        {text}
      </Space>
    ),
    [commentOpened]
  );
  const onToggleComment = useCallback(() => {
    setCommentOpened(!commentOpened);
  }, [commentOpened]);

  useEffect(() => {
    setCommentOpened(false);
  }, [me, isLoggedIn]);
  const data = dayjs(post.createdAt);

  return (
    <>
      {post.loading ? (
        <>
          <List.Item>
            <Skeleton avatar title={false} loading={post.loading} active>
              <List.Item.Meta />
            </Skeleton>
          </List.Item>
        </>
      ) : (
        <>
          <List.Item
            key={post.id}
            actions={[
              <RetweetIcon
                icon={RetweetOutlined}
                text={post.Retweetings.length}
                key="list-vertical-retweet-o"
              />,
              <LikeIcon
                text={post.PostLikers.length}
                liked={liked}
                onToggleLike={onToggleLike}
                key="list-vertical-like-o"
              />,
              <CommentIcon
                icon={MessageOutlined}
                text={post.Comments.length}
                commentOpened={commentOpened}
                onToggleComment={onToggleComment}
                key="list-vertical-comment"
              />,
            ]}
            extra={
              post.User.id === me?.id ? (
                <>
                  <div>
                    <Popover
                      placement="left"
                      content={
                        <Space>
                          <Button type="primary" onClick={hide}>
                            수정
                          </Button>
                          <Button
                            danger
                            onClick={onDelete}
                            loading={deletePostLoading}
                          >
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
                  </div>
                </>
              ) : null
            }
          >
            <List.Item.Meta
              avatar={
                <>
                  <Avatar src={`http://localhost:3065/img/${post.User.src}`} />
                </>
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
                    {data.format("YY-MM-DD")}
                  </div>
                </>
              }
              description={post.description}
            />
            {post.Images && <ImageSlider images={post.Images} size={"20vw"} />}
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
                  renderItem={(comment) => (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      postId={post.id}
                    />
                  )}
                />
              )}
              {me && isLoggedIn ? <CommentForm postId={post.id} /> : null}
            </List.Item>
          ) : null}
        </>
      )}
    </>
  );
};
export default PostCard;
