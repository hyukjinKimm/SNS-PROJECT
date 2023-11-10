import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import AppLayout from "../components/AppLayout";
import UserProfile from "../components/UserProfile";
import * as postActions from "../reducerss/post";

import { getUserInfo } from "../reducerss/user";
import { useDispatch, useSelector } from "react-redux";

function Home(props) {
  const router = useRouter();

  const dispatch = useDispatch();
  const { me, user, loadProfileOwnerError } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (!router.isReady) return;
    dispatch(postActions.clearPost());
    dispatch(getUserInfo(router.query.nickname));
  }, [router.isReady]);

  useEffect(() => {}, []);
  useEffect(() => {
    if (loadProfileOwnerError) {
      alert("존재하지 않는 유저 입니다.");
      router.push("/");
    }
  }, [loadProfileOwnerError]);
  return (
    <AppLayout>
      <Head>
        <title>프로필 | SNS-PROJECT</title>
      </Head>
      {user ? <UserProfile /> : null}
    </AppLayout>
  );
}

export default Home;
