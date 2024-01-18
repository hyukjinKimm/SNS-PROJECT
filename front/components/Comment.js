import {
  HeartOutlined,
  LoadingOutlined,
  HeartTwoTone,
} from "@ant-design/icons";
import { Comment } from "@ant-design/compatible";
import dayjs from "dayjs";
import React, { useCallback, useState, useEffect } from "react";

import { deleteComment, likeComment, unlikeComment } from "../reducers/post";
import { Avatar, Space, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../reducers/user";
import { BACK_URL, FRONT_URL } from "../url";

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
    if (!isLoggedIn) {
      return;
    }
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
                onClick: useCallback(() => {
                  if (!isLoggedIn) {
                    alert("로그인 해주세요!");
                  }
                  onClick();
                }, []),
              })
            : React.createElement(HeartOutlined, {
                onClick: useCallback(() => {
                  if (!isLoggedIn) {
                    alert("로그인 해주세요!");
                  }
                  onClick();
                }, []),
              })}
        </Space>
      ),
    [liked, likeCommentLoading, isLoggedIn]
  );
  const date = dayjs(comment.createdAt);
  const [showCocoment, setShowCocoment] = useState(false);
  const onToggleComment = useCallback(() => {
    alert("기능 개발 중입니다.");
    return;
    setShowCocoment(!showCocoment);
  }, [showCocoment]);

  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const onToggleCommentForm = useCallback(() => {
    if (!isLoggedIn) {
      alert("로그인 해주세요!");
      return;
    }
    alert("기능 개발 중입니다.");
    setCommentFormOpened(!commentFormOpened);
  }, [commentFormOpened]);

  const actions = [
    <Tooltip key="comment-basic-like">
      <span>
        {<LikeIcon liked={liked} onClick={onToggleLike} />}
        <span className="comment-action" style={{ marginLeft: 3 }}>
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

    <span key="comment-basic-reply-to" onClick={onToggleCommentForm}>
      댓글달기
    </span>,
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
        avatar={<Avatar src={`${BACK_URL}/img/${comment.User.src}`} />}
        content={comment.content}
        datetime={
          <Tooltip title={date.format("YY-MM-DD")}>
            <span> {date.format("YY-MM-DD")}</span>
          </Tooltip>
        }
      ></Comment>
    </>
  );
};

export default Com;
