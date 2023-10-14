import {
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
  RetweetOutlined,
  LikeTwoTone,
} from "@ant-design/icons";
import React from "react";
import { Avatar, List, Space } from "antd";
import ImageSlider from "./ImageSlider";
import PostCard from "./PostCard";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const App = ({ posts }) => {
  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
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
