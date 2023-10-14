import React from "react";
import Head from "next/head";
import { Layout, theme, Button } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import AppLayout from "../components/AppLayout";
import PostCards from "../components/PostCards";
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
      <Head>
        <title>홈페이지 | SNS-PROJECT</title>
      </Head>
      <Content
        style={{
          margin: "24px 16px 0",
          overflow: "initial",
        }}
      >
        <div
          style={{
            padding: 24,
            background: colorBgContainer,
          }}
        >
          <PostCards posts={mainPosts} />
        </div>
      </Content>
    </AppLayout>
  );
}

export default Home;
