import Head from "next/head";
import AppLayout from "../components/AppLayout";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

import React, { useState } from "react";
import { useSelector } from "react-redux";

const LogIn = () => {
  const { logInOrSignUp } = useSelector((state) => state.screen);
  return (
    <>
      <Head>
        <title>로그인 | SNS-PROJECT</title>
      </Head>
      <AppLayout>{logInOrSignUp ? <LoginForm /> : <SignUpForm />}</AppLayout>
    </>
  );
};

export default LogIn;
