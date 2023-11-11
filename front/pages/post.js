import Head from "next/head";
import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import * as screenActions from "../reducers/screen";
import { useDispatch, useSelector } from "react-redux";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Post = () => {
  const route = useRouter();
  const { addPostDone } = useState(() => {
    if (addPostDone) {
      route.push("/");
    }
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(screenActions.changeMenu("POST"));
  }, []);

  return (
    <>
      <Head>
        <title>만들기 | SNS-PROJECT</title>
      </Head>
      <AppLayout>
        <PostForm />
      </AppLayout>
    </>
  );
};

export default Post;
