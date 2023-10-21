import {
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
  RetweetOutlined,
  LikeTwoTone,
} from "@ant-design/icons";
import React, { useEffect } from "react";
import { Avatar, List, Space } from "antd";
import ImageSlider from "./ImageSlider";
import PostCard from "./PostCard";
import { loadMorePosts, loadPostRequestAction } from "../reducers/post";
import { useDispatch, useSelector } from "react-redux";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const App = ({ posts }) => {
  const { hasMorePost, loadPostLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPostRequestAction(loadMorePosts(10)));
  }, []);
  useEffect(() => {
    function onScroll() {
      if (
        document.documentElement.scrollTop +
          document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePost && !loadPostLoading) {
          dispatch(loadPostRequestAction(loadMorePosts(10)));
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
        dataSource={posts}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={(post) => <PostCard post={post} />}
      />
    </>
  );
};
export default App;
