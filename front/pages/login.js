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
  const dispatch = useDispatch();
  const { signUpDone } = useSelector((state) => state.user);
  const { logInOrSignUp } = useSelector((state) => state.screen);
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
      {logInOrSignUp ? <LoginForm /> : <SignUpForm />}
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

      if (data.payload) {
        res.writeHead(301, { Location: "/" });
        res.end();

        return true;
      } else {
        store.dispatch(screenActions.changeMenu("LOGIN"));
        return {
          props: {},
        };
      }
    }
);

export default LogIn;
