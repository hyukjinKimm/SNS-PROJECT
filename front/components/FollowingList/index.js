import React, { useEffect, useState, useCallback } from "react";
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
  Input,
} from "antd";
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
import { Follow, getUserInfo, unFollow } from "../../reducers/user";

const FollowingList = ({ followings, onClose }) => {
  const { isLoggedIn, me, user, followDone } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const onClickunFollow = useCallback((id) => {
    dispatch(unFollow(id));
  }, []);
  const onClickFollow = useCallback((id) => {
    dispatch(Follow(id));
  }, []);
  useEffect(() => {
    if (followDone) {
      dispatch(getUserInfo(user.nickname));
    }
  }, [followDone]);
  return (
    <>
      <Overlay>
        <Header></Header>
        <Row
          style={{
            position: "relative",
            top: 0,
            left: "30%",
            backgroundPosition: "center",
          }}
        >
          <Col
            style={{
              backgroundColor: "white",
              width: "40%",
            }}
          >
            <div style={{}}>
              <div
                style={{
                  fontSize: "20px",
                  textAlign: "center",
                  marginTop: "10px",

                  fontFamily: "Georgia",
                }}
              >
                팔로우
              </div>
              <Input.Search
                style={{
                  margin: "20px",

                  width: "80%",
                }}
                size="large"
              />
              <CloseBtn onClick={onClose}>X</CloseBtn>
            </div>

            <div
              style={{
                height: "1px",
                background: "#ced4da",
              }}
            ></div>

            <div
              id="scrollableDiv"
              style={{
                height: 500,
                overflow: "auto",
                padding: "0 16px",
                border: "1px solid rgba(140, 140, 140, 0.35)",
              }}
            >
              <InfiniteScroll
                dataLength={followings.length}
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
                endMessage={
                  <Divider plain>팔로우 목록의 끝 입니다.. 🤐</Divider>
                }
              >
                <List
                  dataSource={followings}
                  renderItem={(following) => (
                    <List.Item
                      key={following.id}
                      actions={[
                        isLoggedIn ? (
                          me.id ==
                          following.id ? null : me.Followings?.findIndex(
                              (f) => f.id == following.id
                            ) > -1 ? (
                            <Button
                              type="primary"
                              key="list-loadmore-edit"
                              onClick={() => {
                                onClickunFollow(following.id);
                              }}
                              loading={false}
                            >
                              언팔로우
                            </Button>
                          ) : (
                            <Button
                              type="primary"
                              key="list-loadmore-edit"
                              onClick={() => {
                                onClickFollow(following.id);
                              }}
                              loading={false}
                            >
                              팔로우
                            </Button>
                          )
                        ) : null,
                      ]}
                    >
                      <Skeleton avatar title={false} loading={false} active>
                        <List.Item.Meta
                          avatar={
                            <>
                              <Avatar
                                src={`http://localhost:3065/img/${following.src}`}
                              />
                            </>
                          }
                          title={
                            <a
                              href={`http://localhost:3060/profile/${following.nickname}`}
                            >
                              {following.nickname}
                            </a>
                          }
                          description={following.description}
                        />
                      </Skeleton>
                    </List.Item>
                  )}
                />
              </InfiniteScroll>
            </div>
          </Col>
        </Row>
      </Overlay>
    </>
  );
};

export default FollowingList;
