import Head from "next/head";
import AppLayout from "../components/AppLayout";
import SignUpForm from "../components/SignUpForm";

import React from "react";

const SingUp = () => {
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
