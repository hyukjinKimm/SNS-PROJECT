import React from "react";
import { Layout, theme, Button } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import AppLayout from "../components/AppLayout";
import PostCard from "../components/PostCard";
import { useDispatch, useSelector } from "react-redux";
const { Header, Content, Footer, Sider } = Layout;
function Home(props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { mainPosts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  return (
    <AppLayout>
      <Content
        style={{
          margin: "24px 16px 0",
          overflow: "initial",
        }}
      >
        <div
          style={{
            padding: 24,
            textAlign: "center",
            background: colorBgContainer,
          }}
        >
          {mainPosts.map((post, index) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </Content>
    </AppLayout>
  );
}

export default Home;
