import {
  HeartOutlined,
  LoadingOutlined,
  HeartTwoTone,
} from "@ant-design/icons";
import { Comment } from "@ant-design/compatible";
import dayjs from "dayjs";
import React, { useCallback, useState, useEffect } from "react";

import {
  deletePost,
  likePost,
  deleteComment,
  likeComment,
  unlikeComment,
} from "../reducers/post";
import { Avatar, List, Space, Tooltip, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../reducers/user";
const Com = ({ comment, postId }) => {
  const dispatch = useDispatch();
  const { me, isLoggedIn, user } = useSelector((state) => state.user);
  const { likeCommentDone } = useSelector((state) => state.post);
  const [likeCommentLoading, setLikeCommentLoading] = useState(false);
  const onDeleteComment = useCallback(
    (comment) => {
      if (confirm("댓글을 삭제하시겠습니까?")) {
        const data = { postId, commentId: comment.id };
        dispatch(deleteComment(data));
      }
    },
    [comment]
  );

  const [liked, setLiked] = useState(false);
  const onToggleLike = useCallback(() => {
    console.log("hi");
    setLiked(!liked);
    setLikeCommentLoading(true);
    const data = { postId, commentId: comment.id };
    if (!liked) {
      dispatch(likeComment(data));
    } else {
      dispatch(unlikeComment(data));
    }
  }, [liked]);
  useEffect(() => {
    if (likeCommentDone && likeCommentLoading) {
      setLikeCommentLoading(false);
      if (user) {
        dispatch(getUserInfo(user.nickname));
      }
    }
  }, [likeCommentDone, user]);
  useEffect(() => {
    if (
      comment?.CommentLikers?.find((e) => {
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
  const LikeIcon = useCallback(
    ({ liked, onClick }) =>
      likeCommentLoading ? (
        <LoadingOutlined />
      ) : (
        <Space>
          {liked
            ? React.createElement(HeartTwoTone, {
                twoToneColor: "#eb2f96",
                onClick: isLoggedIn
                  ? () => {
                      onClick();
                    }
                  : null,
              })
            : React.createElement(HeartOutlined, {
                onClick: isLoggedIn
                  ? () => {
                      onClick();
                    }
                  : null,
              })}
        </Space>
      ),
    [liked, likeCommentLoading, isLoggedIn]
  );
  const date = dayjs(comment.createdAt);
  const [showCocoment, setShowCocoment] = useState(false);
  const onToggleComment = useCallback(() => {
    setShowCocoment(!showCocoment);
    console.log("hi");
  }, [showCocoment]);

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span>
        {<LikeIcon liked={liked} onClick={onToggleLike} />}
        <span className="comment-action" style={{ marginLeft: 5 }}>
          {comment?.CommentLikers?.length}
        </span>
        <span
          onClick={onToggleComment}
          className="cocomment-action"
          style={{ marginLeft: 5 }}
        >
          {showCocoment ? "대댓글닫기" : "대댓글보기"}
        </span>
      </span>
    </Tooltip>,

    <span key="comment-basic-reply-to">답글달기</span>,
    isLoggedIn && comment.User.id == me.id ? (
      <span
        style={{ color: "red" }}
        key="comment-basic-delete"
        onClick={useCallback(() => {
          onDeleteComment(comment);
        }, [])}
      >
        삭제하기
      </span>
    ) : null,
  ];

  return (
    <>
      <Comment
        style={{ marginLeft: 10 }}
        actions={actions}
        author={
          <a href={"/profile/" + comment.User.nickname}>
            {comment.User.nickname}
          </a>
        }
        avatar={
          <Avatar src={`http://localhost:3065/img/${comment.User.src}`} />
        }
        content={comment.content}
        datetime={
          <Tooltip title={date.format("YY-MM-DD")}>
            <span> {date.format("YY-MM-DD")}</span>
          </Tooltip>
        }
      >
        {showCocoment
          ? [
              <Comment
                style={{ marginLeft: 10 }}
                actions={actions}
                author={
                  <a href={"/profile/" + comment.User.nickname}>
                    {comment.User.nickname}
                  </a>
                }
                avatar={
                  <Avatar
                    src={`http://localhost:3065/img/${comment.User.src}`}
                  />
                }
                content={comment.content}
                datetime={
                  <Tooltip title={date.format("YY-MM-DD")}>
                    <span> {date.format("YY-MM-DD")}</span>
                  </Tooltip>
                }
              />,
              <Comment
                style={{ marginLeft: 10 }}
                actions={actions}
                author={
                  <a href={"/profile/" + comment.User.nickname}>
                    {comment.User.nickname}
                  </a>
                }
                avatar={
                  <Avatar
                    src={`http://localhost:3065/img/${comment.User.src}`}
                  />
                }
                content={comment.content}
                datetime={
                  <Tooltip title={date.format("YY-MM-DD")}>
                    <span> {date.format("YY-MM-DD")}</span>
                  </Tooltip>
                }
              />,
            ]
          : null}
      </Comment>
    </>
  );
};

export default Com;
