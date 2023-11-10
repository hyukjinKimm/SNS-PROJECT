import Head from "next/head";
import AppLayout from "../components/AppLayout";
import SignUpForm from "../components/SignUpForm";
import * as screenActions from "../reducerss/screen";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const SingUp = () => {
  useEffect(() => {
    dispatch(screenActions.changeMenu("LOGIN"));
  }, []);
  return (
    <>
      <Head>
        <title>로그인 | SNS-PROJECT</title>
      </Head>
      <AppLayout>
        <SignUpForm />
      </AppLayout>
    </>
  );
};

export default SingUp;
