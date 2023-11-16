import React, { useState, useEffect } from "react";
import Head from "next/head";
import { wrapper } from "../store/configureStore";
import axios from "axios";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import * as screenActions from "../reducers/screen";
import { getMyInfo } from "../reducers/user";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

const LogIn = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { signUpDone, me } = useSelector((state) => state.user);
  const { logInOrSignUp } = useSelector((state) => state.screen);
  useEffect(() => {
    if (me) {
      if (typeof window !== "undefined") {
        alert("로그인 상태입니다.");
        router.push("/");
      }
    }
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
      {logInOrSignUp ? <LoginForm /> : <SignUpForm />}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";

      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }

      store.dispatch(screenActions.changeMenu("LOGIN"));
      await store.dispatch(getMyInfo());
      return { props: {} };
    }
);
export default LogIn;
