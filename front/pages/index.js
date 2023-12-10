import React, { useEffect } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { Layout, theme } from "antd";
import { wrapper } from "../store/configureStore";
import { getMyInfo } from "../reducers/user";
import axios from "axios";
const { Content } = Layout;
import * as userActions from "../reducers/user";
import * as postActions from "../reducers/post";
import * as screenActions from "../reducers/screen";
import { loadMorePosts, loadPosts } from "../reducers/post";

import AppLayout from "../components/AppLayout";
import PostCards from "../components/PostCards";

function Home(props) {
  const { mainPosts } = useSelector((state) => state.post);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
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
          <PostCards mainPosts={mainPosts} />
        </div>
      </Content>
    </>
  );
}
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";

      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      store.dispatch(screenActions.changeMenu("HOME"));
      store.dispatch(postActions.initializePostState());
      store.dispatch(userActions.initializeUserState());
      await store.dispatch(getMyInfo());
      await store.dispatch(loadPosts({}));

      return {
        props: {},
      };
    }
);
export default Home;
