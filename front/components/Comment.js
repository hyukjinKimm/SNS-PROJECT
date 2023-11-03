import { HeartOutlined } from "@ant-design/icons";
import React, { useCallback } from "react";

import {
  deletePostRequestAction,
  likePostRequestAction,
  unLikePostRequestAction,
  deleteCommentRequest,
} from "../reducers/post";
import { Avatar, List } from "antd";
import { useDispatch, useSelector } from "react-redux";
const Comment = ({ comment, postId }) => {
  const dispatch = useDispatch();
  const { me, isLoggedIn } = useSelector((state) => state.user);
  const onDeleteComment = useCallback((e, comment) => {
    alert("댓글을 삭제하시겠습니까?");
    const data = { postId, commentId: comment.id };
    dispatch(deleteCommentRequest(data));
  }, []);
  return (
    <>
      <List.Item
        actions={[
          <div>좋아요 {22}개</div>,
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
        extra={[<HeartOutlined />]}
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
