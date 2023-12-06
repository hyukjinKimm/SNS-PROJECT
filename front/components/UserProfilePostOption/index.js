import React, { useEffect, useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  List,
  Avatar,
  Space,
  Button,
  Skeleton,
  Popover,
  Divider,
} from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import ImageSlider from "../ImageSlider";
import dayjs from "dayjs";
import {
  Overlay,
  Global,
  Header,
  CloseBtn,
  ImgWrapper,
  Indicator,
  SlickWrapper,
} from "./styles";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import CommentForm from "../CommentForm";
import Comment from "../Comment";
import { deletePost, likePost, unlikePost } from "../../reducers/post";
import { getUserInfo } from "../../reducers/user";
const UserProfilePostOption = ({ id, onClose }) => {
  const { me, user } = useSelector((state) => state.user);
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
  return (
    <>
      <Overlay>
        <div style={{ fontSize: "200px", marginLeft: "37%" }}>
          <Space style={{ width: "20%" }}>
            <Space.Compact direction="vertical" style={{ width: 300 }}>
              <Button
                size="large"
                style={{ color: "red" }}
                onClick={onDelete}
                loading={deletePostLoading}
              >
                삭제
              </Button>
              <Button size="large">삭제</Button>
              <Button size="large" style={{ color: "blue" }} onClick={onClose}>
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
