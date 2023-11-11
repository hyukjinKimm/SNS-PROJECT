import React, { useEffect } from "react";
import { List, Space } from "antd";

import PostCard from "./PostCard";
import * as postActions from "../reducers/post";
import { loadMorePosts, loadPosts } from "../reducers/post";
import { useDispatch, useSelector } from "react-redux";

const PostCards = ({ posts }) => {
  const { hasMorePosts, loadPostsLoading, loadPostsError } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPosts());
  }, []);
  useEffect(() => {
    if (loadPostsError) {
      alert(loadPostsError);
    }
  }, [loadPostsError]);
  useEffect(() => {
    function onScroll() {
      if (
        document.documentElement.scrollTop +
          document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = posts[posts.length - 1]?.id;
          dispatch(loadPosts(lastId));
        }
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePosts, loadPostsLoading]);
  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        loading={loadPostsLoading}
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
