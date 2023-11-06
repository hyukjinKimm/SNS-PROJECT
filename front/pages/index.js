import React, { useEffect } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";

import { Layout, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;
import { clearUserErrorAction } from "../reducers/user";
import AppLayout from "../components/AppLayout";
import PostCards from "../components/PostCards";

function Home(props) {
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { mainPosts } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(clearUserErrorAction());
  }, []);
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
