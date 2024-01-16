import React, { useEffect, useState, useCallback } from "react";
import { Space, Button } from "antd";
import { Overlay } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../reducers/post";
const UserProfilePostOption = ({
  id,
  onClosePostOption,
  onClickPostEdit,
  onClickReportPost,
  userId,
}) => {
  const { me, isLoggedIn } = useSelector((state) => state.user);
  const [deletePostLoading, setDeletePostLoading] = useState(false);
  const { deletePostDone } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const onDelete = useCallback((e) => {
    if (confirm("게시글을 삭제 하시겠습니까?")) {
      setDeletePostLoading(true);
      dispatch(deletePost(id));
    }
  }, []);

  useEffect(() => {
    if (deletePostDone) {
      setDeletePostLoading(false);
      onClose();
    }
    return;
  }, [deletePostDone]);
  const onClickEdit = useCallback(() => {
    onClosePostOption();
    onClickPostEdit();
  }, []);
  const onClickReport = useCallback(() => {
    if (!isLoggedIn) {
      alert("로그인 해주세요");
      return;
    }
    onClosePostOption();
    onClickReportPost();
  }, []);

  return (
    <>
      <Overlay>
        <div style={{ fontSize: "200px", marginLeft: "37%" }}>
          <Space style={{ width: "20%" }}>
            <Space.Compact direction="vertical" style={{ width: 300 }}>
              {userId == me?.id ? (
                <>
                  <Button
                    size="large"
                    style={{ color: "red" }}
                    onClick={onDelete}
                    loading={deletePostLoading}
                  >
                    삭제
                  </Button>
                  <Button size="large" onClick={onClickEdit}>
                    수정
                  </Button>
                </>
              ) : null}
              <Button onClick={onClickReport} style={{ color: "red" }}>
                신고
              </Button>

              <Button
                size="large"
                style={{ color: "blue" }}
                onClick={onClosePostOption}
              >
                닫기
              </Button>
            </Space.Compact>
          </Space>
        </div>
      </Overlay>
    </>
  );
};

export default UserProfilePostOption;
