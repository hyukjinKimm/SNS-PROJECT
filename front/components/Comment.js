import {
  HeartOutlined,
  LoadingOutlined,
  HeartTwoTone,
} from "@ant-design/icons";
import React, { useCallback, useState, useEffect } from "react";

import {
  deletePost,
  likePost,
  deleteComment,
  likeComment,
  unlikeComment,
} from "../reducerss/post";
import { Avatar, List, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
const Comment = ({ comment, postId }) => {
  const dispatch = useDispatch();
  const { me, isLoggedIn } = useSelector((state) => state.user);
  const { likeCommentDone } = useSelector((state) => state.post);
  const [likeCommentLoading, setLikeCommentLoading] = useState(false);
  const onDeleteComment = useCallback((e, comment) => {
    if (confirm("댓글을 삭제하시겠습니까?")) {
      const data = { postId, commentId: comment.id };
      dispatch(deleteComment(data));
    }
  }, []);

  const [liked, setLiked] = useState(false);
  const onToggleLike = useCallback(() => {
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
    if (likeCommentDone) {
      setLikeCommentLoading(false);
    }
  }, [likeCommentDone]);
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
  return (
    <>
      <List.Item
        actions={[
          <div>좋아요 {comment?.CommentLikers?.length}개</div>,
          <div>답글달기</div>,
          comment.User.id === me?.id && (
            <div style={{ color: "blue", fontSize: "10px" }}>수정하기</div>
          ),
          comment.User.id === me?.id && (
            <div
              onClick={(e) => {
                onDeleteComment(e, comment);
              }}
              style={{
                color: "red",
                fontSize: "10px",
                cursor: "pointer",
              }}
            >
              삭제하기
            </div>
          ),
        ].filter((element) => {
          if (element) return true;
        })}
        extra={[<LikeIcon liked={liked} onClick={onToggleLike} />]}
      >
        <List.Item.Meta
          avatar={<Avatar> {comment.User.nickname[0]}</Avatar>}
          description={comment.content}
        />
      </List.Item>
    </>
  );
};

export default Comment;
