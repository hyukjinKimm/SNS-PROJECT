import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  SettingOutlined,
  TableOutlined,
  MessageFilled,
} from "@ant-design/icons";
import { Image, Row, Col, Card, Layout, theme, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Follow, getUserInfo, unFollow } from "../reducers/user";
import FollowerList from "./FollowerList";
import FollowingList from "./FollowingList";
import UserProfilePostImage from "./UserProfilePostImage";
import { loadPosts } from "../reducers/post";

const { Meta } = Card;
const { Content } = Layout;

const UserProfile = () => {
  const { me, user, followError, followDone, isLoggedIn } = useSelector(
    (state) => state.user
  );
  const { mainPosts } = useSelector((state) => state.post);

  const dispatch = useDispatch();
  const onClickFollow = useCallback(() => {
    dispatch(Follow(user.id));
  }, [user]);
  const onClickunFollow = useCallback(() => {
    dispatch(unFollow(user.id));
  }, [user]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    if (followDone) {
      dispatch(getUserInfo(user.nickname));
    }
  }, [followDone]);
  useEffect(() => {
    if (followError) {
      alert(followError);
    }
  }, [followError]);
  const division = useCallback((arr, n) => {
    const copy = [...arr];
    const length = arr.length;
    const divide =
      Math.floor(length / n) + (Math.floor(length % n) > 0 ? 1 : 0);
    const newArray = [];

    for (let i = 0; i <= divide; i++) {
      // 배열 0부터 n개씩 잘라 새 배열에 넣기
      newArray.push(copy.splice(0, n));
    }

    return newArray;
  }, []);
  const result = mainPosts?.length > 0 ? division(mainPosts, 3) : [];
  const { hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
  useEffect(() => {
    function onScroll() {
      if (
        document.documentElement.scrollTop +
          document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts?.length - 1]?.id;
          dispatch(loadPosts({ lastId, userId: user.id }));
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePosts, loadPostsLoading]);

  const [showFollower, setShowFollower] = useState(false);
  const onClickFollowerList = useCallback(() => {
    setShowFollower(true);
  }, []);
  const onCloseFollowerList = useCallback(() => {
    setShowFollower(false);
  }, []);

  const [showFollowing, setShowFollowing] = useState(false);
  const onClickFollowingList = useCallback(() => {
    setShowFollowing(true);
  }, []);
  const onCloseFollowingList = useCallback(() => {
    setShowFollowing(false);
  }, []);
  return (
    <>
      <Content
        style={{
          margin: "24px 16px 0",
          overflow: "initial",
        }}
      >
        <div
          style={{
            padding: 24,
            paddingLeft: "4vw",
            background: colorBgContainer,
          }}
        >
          <Row gutter={2}>
            <Col span={5}>
              <div
                style={{
                  width: "11vw",
                  height: "11vw",
                  borderRadius: "70%",
                  overflow: "hidden",
                }}
              >
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  width={"11vw"}
                  height={"11vw"}
                  src={"http://localhost:3065/img/" + user.src}
                />
              </div>
            </Col>

            <Col>
              <div style={{ width: "40vw" }}>
                <Card
                  bodyStyle={{
                    fontSize: "15px",
                  }}
                  size={64}
                  actions={[
                    me && me.id == user.id ? (
                      <div key="edit">
                        <Link href="http://localhost:3060/edit">
                          프로필 수정
                        </Link>
                        <br />
                        <SettingOutlined key="edit_icon" />
                      </div>
                    ) : (
                      <div key="message">
                        <Link href="/profile/edit"> 메세지보내기</Link>
                        <br />
                        <MessageFilled key="message_icon" />
                      </div>
                    ),
                    <div key="posts">
                      게시물
                      <br />
                      {mainPosts?.length}
                    </div>,
                    <div key="followers" onClick={onClickFollowerList}>
                      팔로워
                      <br />
                      {user?.Followers.length}
                    </div>,
                    <div key="followings" onClick={onClickFollowingList}>
                      팔로우
                      <br />
                      {user?.Followings.length}
                    </div>,
                  ]}
                >
                  <Meta
                    title={user?.nickname}
                    description={user?.description}
                    style={{ height: "11vh", paddingTop: 10 }}
                  />
                  {isLoggedIn && me?.id != user?.id ? (
                    me?.Followings?.find((e) => {
                      if (e.id == user.id) {
                        return true;
                      }
                    }) ? (
                      <Button onClick={onClickunFollow} loading={false}>
                        언팔로우
                      </Button>
                    ) : (
                      <Button onClick={onClickFollow} loading={false}>
                        팔로우
                      </Button>
                    )
                  ) : null}
                </Card>
              </div>
            </Col>
          </Row>
        </div>
        <div
          style={{
            padding: 24,
            background: colorBgContainer,
          }}
        >
          <div style={{ width: "70%" }}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <TableOutlined style={{ fontSize: "30px", marginBottom: "20" }} />
              <br />
              <div style={{ fontSize: "20px" }}>게시물</div>
            </div>
            {result.length > 0 ? (
              result.map((items) => {
                return (
                  <Row gutter={[10, 10]}>
                    {items.length > 0
                      ? items.map((post) => {
                          return (
                            <UserProfilePostImage
                              post={post}
                            ></UserProfilePostImage>
                          );
                        })
                      : null}
                  </Row>
                );
              })
            ) : (
              <div style={{ textAlign: "center", marginTop: "5%" }}>
                게시물이 없습니다.
              </div>
            )}
          </div>
        </div>
      </Content>
      {showFollower && (
        <FollowerList
          followers={user.Followers}
          onClose={onCloseFollowerList}
        />
      )}
      {showFollowing && (
        <FollowingList
          followings={user.Followings}
          onClose={onCloseFollowingList}
        />
      )}
    </>
  );
};

export default UserProfile;
