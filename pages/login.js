import React, { useCallback } from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import LoginForm from "../components/LoginForm";

const LogIn = () => {
  return (
    <>
      <Head>
        <title>로그인 | SNS-PROJECT</title>
      </Head>
      <AppLayout>
        <LoginForm />
      </AppLayout>
    </>
  );
};

export default LogIn;
