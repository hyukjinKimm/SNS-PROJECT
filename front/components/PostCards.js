import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List } from "antd";
import PostCard from "./PostCard";
import { loadPosts } from "../reducers/post";
const PostCards = ({ mainPosts }) => {
  const { hasMorePosts, loadPostsLoading, reportPostDone, reportPostError } =
    useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    function onScroll() {
      if (
        document.documentElement.scrollTop +
          document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch(loadPosts({ lastId }));
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePosts, loadPostsLoading]);
  useEffect(() => {
    if (reportPostDone) {
      alert("신고 완료");
    }
  }, [reportPostDone]);
  useEffect(() => {
    if (reportPostError) {
      alert(reportPostError);
    }
  }, [reportPostError]);
  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        loading={loadPostsLoading}
        dataSource={mainPosts}
        renderItem={(post) => <PostCard post={post} key={post.id} />}
      />
    </>
  );
};
export default PostCards;
