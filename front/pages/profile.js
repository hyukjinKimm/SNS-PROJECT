import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";

import UserProfile from "../components/UserProfile";

const Profile = () => {
  return (
    <>
      <Head>
        <title>내 프로필 | SNS-PROJECT</title>
      </Head>
      <AppLayout>
        <UserProfile />
        <div> hi</div>
      </AppLayout>
    </>
  );
};

export default Profile;
