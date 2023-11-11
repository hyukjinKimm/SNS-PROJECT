import React, { useEffect } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Layout, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;
import * as userActions from "../reducers/user";
import * as postActions from "../reducers/post";
import * as screenActions from "../reducers/screen";
import { initializeUserState } from "../reducers/user";
import AppLayout from "../components/AppLayout";
import PostCards from "../components/PostCards";

function Home(props) {
  const route = useRouter();

  const dispatch = useDispatch();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { mainPosts } = useSelector((state) => state.post);
  const { selectedMenu } = useSelector((state) => state.screen);
  useEffect(() => {
    dispatch(postActions.initializePostState());
    dispatch(userActions.initializeUserState());
  }, []);
  useEffect(() => {
    dispatch(screenActions.changeMenu("HOME"));
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
