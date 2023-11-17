import React, { useState, useCallback } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
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
      getItem("프로필 편집", "profile edit"),
      getItem("언어 기본 설정", "language setting"),
      getItem("회원탈퇴", "withdraw"),
    ],
    "group"
  ),
];
const Edit = () => {
  const onClick = (e) => {
    console.log("click ", e);
  };
  const [nav, setNav] = useState(0);

  return (
    <>
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
      {nav == 1 ? (
        <ProfileEdit />
      ) : nav == 2 ? (
        <LanguageSetting />
      ) : nav == 3 ? (
        <WithDraw />
      ) : null}
    </>
  );
};

export default Edit;
