import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import AppLayout from "../components/AppLayout";
import UserProfile from "../components/UserProfile";

function Home(props) {
  const router = useRouter();
  console.log(router);
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
