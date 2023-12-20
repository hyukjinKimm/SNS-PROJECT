import Head from "next/head";
import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import * as screenActions from "../reducers/screen";
import { useDispatch, useSelector } from "react-redux";
import { getMyInfo } from "../reducers/user";
import React, { useEffect, useState } from "react";
import { wrapper } from "../store/configureStore";
import axios from "axios";
import { useRouter } from "next/router";

const Post = () => {
  const route = useRouter();
  const { addPostDone } = useSelector((state) => state.post);
  useEffect(() => {
    if (addPostDone) {
      route.push("/");
    }
  }, [addPostDone]);

  return (
    <>
      <Head>
        <title>만들기 | SNS-PROJECT</title>
      </Head>

      <PostForm />
    </>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";

      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }

      const data = await store.dispatch(getMyInfo());
      if (!data.payload) {
        res.writeHead(301, { Location: "/" });
        res.end();
        return true;
      } else {
        store.dispatch(screenActions.changeMenu("POST"));
        return {
          props: {},
        };
      }
    }
);

export default Post;
