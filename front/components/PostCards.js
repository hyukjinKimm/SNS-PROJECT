import React, { useEffect } from "react";
import { List, Space } from "antd";

import PostCard from "./PostCard";
import * as postActions from "../reducerss/post";
import { loadMorePosts, loadPosts } from "../reducerss/post";
import { useDispatch, useSelector } from "react-redux";

const PostCards = ({ posts }) => {
  const { hasMorePost, loadPostLoading, loadPostError } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPosts());
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
          const lastId = posts[posts.length - 1]?.id;
          dispatch(loadPosts(lastId));
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
