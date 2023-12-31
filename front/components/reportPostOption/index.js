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
import {
  deletePost,
  likePost,
  unlikePost,
  reportPost,
} from "../../reducers/post";
import { getUserInfo } from "../../reducers/user";
const ReportPostOption = ({ id, onCloseReportOption }) => {
  const { me, user, isLoggedIn } = useSelector((state) => state.user);
  const [deletePostLoading, setDeletePostLoading] = useState(false);
  const { deletePostDone } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  return (
    <>
      <Overlay>
        <div style={{ fontSize: "200px", marginLeft: "37%" }}>
          <Space style={{ width: "20%" }}>
            <Space.Compact direction="vertical" style={{ width: 300 }}>
              <Button
                onClick={useCallback(() => {
                  dispatch(
                    reportPost({
                      postId: id,
                    })
                  );
                }, [])}
              >
                못생겼음
              </Button>
              <Button
                onClick={useCallback(() => {
                  dispatch(
                    reportPost({
                      postId: id,
                    })
                  );
                }, [])}
              >
                스팸
              </Button>
              <Button
                onClick={useCallback(() => {
                  dispatch(
                    reportPost({
                      postId: id,
                    })
                  );
                }, [])}
              >
                이상한 게시글을 올림
              </Button>
              <Button
                onClick={useCallback(() => {
                  dispatch(
                    reportPost({
                      postId: id,
                    })
                  );
                }, [])}
              >
                혐오발언 또는 상징
              </Button>
              <Button
                onClick={useCallback(() => {
                  dispatch(
                    reportPost({
                      postId: id,
                    })
                  );
                }, [])}
              >
                폭력 또는 위험한 단체
              </Button>
              <Button
                onClick={useCallback(() => {
                  dispatch(
                    reportPost({
                      postId: id,
                    })
                  );
                }, [])}
                style={{
                  color: "red",
                }}
              >
                그냥 마음에 안듦
              </Button>
              <Button
                size="large"
                style={{ color: "blue" }}
                onClick={onCloseReportOption}
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

export default ReportPostOption;
