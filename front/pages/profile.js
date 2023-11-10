import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import UserProfile from "../components/UserProfile";
import * as screenActions from "../reducerss/screen";
function Home(props) {
  useEffect(() => {
    dispatch(screenActions.changeMenu("PROFILE"));
  }, []);
  return (
    <AppLayout>
      <Head>
        <title>프로필 | SNS-PROJECT</title>
      </Head>
      <UserProfile />
    </AppLayout>
  );
}

export default Home;
