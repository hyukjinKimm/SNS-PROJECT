import React, { useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Avatar, Divider, List, Skeleton, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Follow, unFollow } from "../../reducers/user";
import { BACK_URL, FRONT_URL } from "../../url";

const Search = () => {
  const dispatch = useDispatch();
  const { searchingUser, searchUserError, isLoggedIn, me } = useSelector(
    (state) => state.user
  );

  const onClickFollow = useCallback((id) => {
    dispatch(Follow(id));
  }, []);
  const onClickunFollow = useCallback((id) => {
    dispatch(unFollow(id));
  }, []);
  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <InfiniteScroll
        dataLength={searchingUser ? 1 : 0}
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
      >
        {searchingUser ? (
          <List>
            <List.Item
              key={searchingUser.email}
              actions={[
                isLoggedIn ? (
                  me.id == searchingUser.id ? null : me.Followings?.findIndex(
                      (f) => f.id == searchingUser.id
                    ) > -1 ? (
                    <Button
                      type="primary"
                      key="list-loadmore-edit"
                      onClick={() => {
                        onClickunFollow(searchingUser.id);
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
                        onClickFollow(searchingUser.id);
                      }}
                      loading={false}
                    >
                      팔로우
                    </Button>
                  )
                ) : null,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={`${BACK_URL}/img/${searchingUser.src}`} />}
                title={
                  <a href={`${FRONT_URL}/profile/${searchingUser.nickname}`}>
                    {searchingUser.nickname}
                  </a>
                }
                description={searchingUser.description}
              />
            </List.Item>
          </List>
        ) : null}
        {searchUserError ? (
          <Divider plain>검색 결과가 없습니다🤐</Divider>
        ) : null}
      </InfiniteScroll>
    </div>
  );
};
export default Search;
