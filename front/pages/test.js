import React, { useState, useCallback } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
const { Content } = Layout;
import ProfileEdit from "../../components/ProfileEdit";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
    onClick: () => {
      console.log("hi");
    },
  };
}
const items = [
  getItem(
    "설정",
    "grp",
    null,
    [
      getItem("프로필 편집", "profileEdit"),
      getItem("언어 기본 설정", "languageSetting"),
      getItem("계정설정", "acoountSetting"),
    ],
    "group"
  ),
];
const Edit = () => {
  const [nav, setNav] = useState(0);
  const onClick = useCallback((e) => {
    console.log(e);
    if (e.key == "profileEdit") {
      setNav(1);
    } else if (e.key == "languageSetting") {
      setNav(2);
    } else if (e.key == "accountSetting") {
      setNav(3);
    }
  }, []);
  return (
    <>
      <div>
        <Menu
          onClick={onClick}
          style={{
            width: 256,
            height: "100vh",
          }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
        />
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div>
            {nav == 1 ? (
              <ProfileEdit />
            ) : nav == 2 ? (
              <LanguageSetting />
            ) : nav == 3 ? (
              <WithDraw />
            ) : null}
          </div>
        </Content>
      </div>
    </>
  );
};

export default Edit;
