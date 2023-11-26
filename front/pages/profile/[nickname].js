import React, { useEffect } from "react";
import Head from "next/head";

import { useSelector } from "react-redux";
import { wrapper } from "../../store/configureStore";
import AppLayout from "../../components/AppLayout";
import UserProfile from "../../components/UserProfile";
import axios from "axios";
import { getMyInfo } from "../../reducers/user";
import * as screenActions from "../../reducers/screen";
import { getUserInfo } from "../../reducers/user";
import { useRouter } from "next/router";
import { loadPosts } from "../../reducers/post";

const Profile = () => {
  const router = useRouter();
  const { me, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      if (typeof window !== "undefined") {
        alert("존재하지않는 유저 입니다.");
        router.push("/");
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>프로필 | SNS-PROJECT</title>
      </Head>
      {user ? <UserProfile /> : null}
    </>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";

      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }

      const me = await store.dispatch(getMyInfo());
      const user = await store.dispatch(getUserInfo(params.nickname));

      await store.dispatch(
        loadPosts({
          lastId: null,

          userId: user.payload.id,
        })
      );
      if (!me.payload) {
        store.dispatch(screenActions.changeMenu("HOME"));
      } else {
        if (me.payload.id == user.payload.id) {
          store.dispatch(screenActions.changeMenu("PROFILE"));
        } else {
          store.dispatch(screenActions.changeMenu("HOME"));
        }
      }

      return {
        props: {},
      };
    }
);
export default Profile;
