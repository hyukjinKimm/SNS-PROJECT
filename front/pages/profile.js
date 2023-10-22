import React from "react";
import Head from "next/head";

import AppLayout from "../components/AppLayout";
import UserProfile from "../components/UserProfile";

function Home(props) {
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
