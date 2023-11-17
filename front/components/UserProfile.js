import React, { useCallback, useEffect } from "react";
import Link from "next/link";
import { SettingOutlined, TableOutlined } from "@ant-design/icons";
import { Image, Row, Col, Card, Layout, theme, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Follow, unFollow } from "../reducers/user";
const { Meta } = Card;
const { Content } = Layout;

const UserProfile = ({}) => {
  const { me, user, followLoading, followError } = useSelector(
    (state) => state.user
  );

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
  const result = user?.Posts.length > 0 ? division(user?.Posts, 3) : [];

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
            paddingLeft: "10vw",
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
                  src="https://cdn.pixabay.com/photo/2023/10/30/16/56/euonymus-europaeus-8353310_1280.jpg"
                />
              </div>
            </Col>

            <Col>
              <div style={{ width: "40vw" }}>
                <Card
                  size={64}
                  actions={[
                    me && me.id == user.id ? (
                      <div key="edit">
                        <Link href="/profile/edit"> 프로필 수정</Link>
                        <br />
                        <SettingOutlined key="edit_icon" />
                      </div>
                    ) : null,
                    <div key="posts">
                      게시물
                      <br />
                      {user?.Posts.length}
                    </div>,
                    <div key="followers">
                      팔로워
                      <br />
                      {user?.Followers.length}
                    </div>,
                    <div key="followings">
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
                  {me?.id != user?.id ? (
                    me?.Followings?.find((e) => {
                      if (e.id == user.id) {
                        return true;
                      }
                    }) ? (
                      <Button onClick={onClickunFollow} loading={followLoading}>
                        언팔로우
                      </Button>
                    ) : (
                      <Button onClick={onClickFollow} loading={followLoading}>
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
          <div style={{ textAlign: "center" }}>
            <TableOutlined style={{ fontSize: "30px", marginBottom: "20" }} />
            <br />
            <div style={{ fontSize: "20px" }}>게시물</div>
          </div>
          <div>
            {result.length > 0 ? (
              result.map((items) => {
                return (
                  <Row gutter={[10, 10]}>
                    {items.length > 0
                      ? items.map((post) => {
                          return (
                            <Col xs={24} md={8}>
                              <img
                                style={{ width: "95%", height: "95%" }}
                                src={
                                  "http://localhost:3065/img/" +
                                  post.Images[0].src
                                }
                              ></img>
                            </Col>
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
    </>
  );
};

export default UserProfile;
