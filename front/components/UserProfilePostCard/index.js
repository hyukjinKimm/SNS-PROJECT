import React, { useEffect, useState, useCallback } from "react";
import { Row, Col, List, Avatar, Space, Skeleton, Divider } from "antd";
import {
  EllipsisOutlined,
  LoadingOutlined,
  HeartTwoTone,
  MessageOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import ImageSlider from "../ImageSlider";
import dayjs from "dayjs";
import { Overlay, Header, CloseBtn } from "./styles";
import { likePost, unlikePost } from "../../reducers/post";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import CommentForm from "../CommentForm";
import Comment from "../Comment";
import UserProfilePostOption from "../UserProfilePostOption";
import ReportPostOption from "../reportPostOption";
import EditPost from "../editPost";
import { BACK_URL, FRONT_URL } from "../../url";

const UserProfilePostCard = ({ post, onClose }) => {
  const { user, me, isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { likePostDone } = useSelector((state) => state.post);
  const [showPostOption, setShowPostOption] = useState(false);
  const onClickPostOption = useCallback(() => {
    setShowPostOption(true);
  }, []);
  const onClosePostOption = useCallback(() => {
    setShowPostOption(false);
  }, []);

  const [showPostEdit, setShowPostEdit] = useState(false);
  const onClickPostEdit = useCallback(() => {
    setShowPostEdit(true);
  }, []);

  const onClosePostEdit = useCallback(() => {
    setShowPostEdit(false);
  }, []);
  const data = dayjs(post.createdAt);
  const [liked, setLiked] = useState(false);
  const [likePostLoading, setLikePostLoading] = useState(false);
  const onToggleLike = useCallback(() => {
    if (!isLoggedIn) {
      return;
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
  const [commentOpened, setCommentOpened] = useState(false);
  const CommentIcon = useCallback(
    ({ icon, text, commentOpened, onToggleComment }) => (
      <Space>
        {React.createElement(icon, {
          style: {
            marginLeft: 20,
            fontSize: 30,
          },
          onClick: () => {
            onToggleComment();
          },
        })}
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
  const RetweetIcon = useCallback(({ icon, text }) => (
    <Space>
      {React.createElement(icon, {
        style: {
          marginLeft: 5,
          fontSize: 30,
        },
        onClick: useCallback(() => {
          alert("기능 개발 중입니다.");
        }, []),
      })}
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
                style: {
                  marginLeft: 20,
                  fontSize: 30,
                },
                onClick: useCallback(() => {
                  if (!isLoggedIn) {
                    alert("로그인 해주세요!");
                    return;
                  }
                  onToggleLike();
                }, []),
              })
            : React.createElement(HeartOutlined, {
                style: {
                  marginLeft: 20,
                  fontSize: 30,
                },
                onClick: useCallback(() => {
                  if (!isLoggedIn) {
                    alert("로그인 해주세요!");
                    return;
                  }
                  onToggleLike();
                }, []),
              })}
          {text}
        </Space>
      ),
    [liked, likePostLoading, isLoggedIn]
  );
  const [showReportOption, setShowReportOption] = useState(false);
  const onClickReportPost = useCallback(() => {
    setShowReportOption(true);
  }, []);
  const onCloseReportOption = useCallback(() => {
    setShowReportOption(false);
  }, []);
  return (
    <>
      <Overlay>
        <Header>
          <CloseBtn onClick={onClose}>X</CloseBtn>
        </Header>
        <Row
          style={{
            position: "relative",
            top: 0,
            left: "16%",
            backgroundPosition: "center",
          }}
        >
          <Col
            style={{
              textAlign: "center",
            }}
          >
            <ImageSlider images={post.Images} size={"35vw"} profile={true} />
          </Col>
          <Col
            style={{
              backgroundColor: "white",
              width: "40%",
            }}
          >
            <List
              style={{
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              <List.Item
                key={post.id}
                extra={
                  <>
                    {
                      <EllipsisOutlined
                        style={{ fontSize: "40px" }}
                        onClick={onClickPostOption}
                      ></EllipsisOutlined>
                    }
                  </>
                }
              >
                <List.Item.Meta
                  avatar={<Avatar src={BACK_URL + "/img/" + user.src} />}
                  title={
                    <>
                      <a href={"/profile/" + user.nickname}>{user.nickname}</a>
                    </>
                  }
                />
              </List.Item>
            </List>
            <List
              style={{
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              <List.Item key={post.id}>
                <List.Item.Meta
                  avatar={<Avatar src={BACK_URL + "/img/" + user.src} />}
                  title={
                    <>
                      <a href={"/profile/" + user.nickname}>{user.nickname}</a>
                      <br />
                      <div
                        style={{
                          fontSize: "13px",
                          display: "inline",
                          color: "#ced4da",
                          fontFamily: "sans-sherif",
                        }}
                      >
                        {data.format("YY-MM-DD")}
                      </div>
                    </>
                  }
                  description={post.content}
                />
              </List.Item>
            </List>
            <div
              style={{
                height: "1px",
                background: "#ced4da",
              }}
            ></div>
            <div
              id="scrollableDiv"
              style={{
                height: 300,
                overflow: "auto",
                padding: "0 16px",
                border: "1px solid rgba(140, 140, 140, 0.35)",
              }}
            >
              <InfiniteScroll
                dataLength={post.Comments.length}
                loader={
                  <Skeleton
                    avatar
                    paragraph={{
                      rows: 1,
                    }}
                    active
                  />
                }
                scrollableTarget="scrollableDiv"
                endMessage={<Divider plain>댓글의 끝 입니다. 🤐</Divider>}
              >
                <List
                  dataSource={post.Comments}
                  renderItem={(comment) => (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      postId={post.id}
                    />
                  )}
                />
              </InfiniteScroll>
            </div>
            <div
              style={{
                height: "1px",
                background: "#ced4da",
              }}
            ></div>
            <div style={{ margin: 5 }}>
              <CommentIcon
                icon={MessageOutlined}
                text={post.Comments.length}
                commentOpened={commentOpened}
                onToggleComment={onToggleComment}
                key="list-vertical-comment"
              />
              ,
              <LikeIcon
                text={post.PostLikers.length}
                liked={liked}
                onToggleLike={onToggleLike}
                key="list-vertical-like-o"
              />
            </div>
            {me && commentOpened ? <CommentForm postId={post.id} /> : null}
          </Col>
        </Row>
      </Overlay>
      {showPostOption && (
        <UserProfilePostOption
          id={post.id}
          userId={post.User.id}
          onClosePostOption={onClosePostOption}
          onClickPostEdit={onClickPostEdit}
          onClickReportPost={onClickReportPost}
          onClose={onClose}
        />
      )}
      {showPostEdit && (
        <EditPost post={post} onClosePostEdit={onClosePostEdit}></EditPost>
      )}
      {showReportOption && (
        <ReportPostOption
          id={post.id}
          onCloseReportOption={onCloseReportOption}
        />
      )}
    </>
  );
};

export default UserProfilePostCard;
