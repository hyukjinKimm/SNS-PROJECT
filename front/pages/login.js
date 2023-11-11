import Head from "next/head";
import AppLayout from "../components/AppLayout";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { Button, Checkbox, Form, Input } from "antd";
import * as screenActions from "../reducers/screen";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const LogIn = () => {
  const dispatch = useDispatch();
  const { logInOrSignUp } = useSelector((state) => state.screen);
  const { signUpDone } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(screenActions.changeMenu("LOGIN"));
  }, []);

  useEffect(() => {
    if (signUpDone) {
      dispatch(screenActions.changeLogInToSignUp(true));
    }
  }, [signUpDone]);
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
