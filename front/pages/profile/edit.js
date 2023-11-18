import React, { useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getMyInfo } from "../../reducers/user";
import * as screenActions from "../../reducers/screen";
import axios from "axios";
import { wrapper } from "../../store/configureStore";
import { SettingOutlined, GlobalOutlined } from "@ant-design/icons";
import ProfileEdit from "../../components/ProfileEdit";
import AccountSetting from "../../components/AccountSetting";
import { Menu } from "antd";
import { useRouter } from "next/router";

const items = [
  {
    label: "프로필 수정",
    key: "profileEdit",
    icon: <SettingOutlined />,
  },
  {
    label: "언어 기본 설정",
    key: "languageSetting",
    icon: <GlobalOutlined />,
  },
  {
    label: "계정 설정",
    key: "accountSetting",
    icon: <SettingOutlined />,
  },
];
const Edit = () => {
  const router = useRouter();
  const [current, setCurrent] = useState("profileEdit");

  const onClick = (e) => {
    setCurrent(e.key);
  };
  const { me } = useSelector((state) => state.user);
  useEffect(() => {
    if (!me) {
      if (typeof window !== "undefined") {
        alert("로그인 해주세요.");
        router.push("/");
      }
    }
  }, []);
  const whichComponent = useCallback(() => {
    switch (current) {
      case "profileEdit":
        return <ProfileEdit />;
        break;
      case "languageSetting":
        return <ProfileEdit />;
        break;
      case "accountSetting":
        return <AccountSetting />;
        break;
    }
  }, [current]);
  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      {whichComponent(current)}
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

      store.dispatch(screenActions.changeMenu("PROFILE"));
      const data = await store.dispatch(getMyInfo());
      if (!data.payload) {
        res.writeHead(301, { Location: "/" });
        res.end();

        return true;
      }
      return { props: {} };
    }
);
export default Edit;
