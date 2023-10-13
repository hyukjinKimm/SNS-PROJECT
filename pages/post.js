import Head from "next/head";
import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";

import React from "react";

const Post = () => {
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
