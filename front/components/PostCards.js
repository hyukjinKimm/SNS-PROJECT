import React, { useEffect } from "react";
import { List, Space } from "antd";

import PostCard from "./PostCard";
import {
  loadMorePosts,
  loadPostRequestAction,
  clearPostRequestAction,
} from "../reducers/post";
import { useDispatch, useSelector } from "react-redux";

const PostCards = ({ posts }) => {
  const { hasMorePost, loadPostLoading, loadPostError } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearPostRequestAction());
    dispatch(loadPostRequestAction());
  }, []);
  useEffect(() => {
    if (loadPostError) {
      alert(loadPostError);
    }
  }, [loadPostError]);
  useEffect(() => {
    function onScroll() {
      if (
        document.documentElement.scrollTop +
          document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePost && !loadPostLoading) {
          const lastId = posts[0]?.id;
          dispatch(loadPostRequestAction(lastId));
        }
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePost, loadPostLoading]);
  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        loading={loadPostLoading}
        dataSource={posts}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={(post) => <PostCard post={post} key={post.id} />}
      />
    </>
  );
};
export default PostCards;
