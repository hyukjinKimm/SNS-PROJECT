import React, { useCallback, useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import ProfileEdit from "../../components/ProfileEdit";
import { Menu } from "antd";
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
  const [current, setCurrent] = useState("profileEdit");

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const whichComponent = useCallback(() => {
    switch (current) {
      case "profileEdit":
        return <ProfileEdit />;
        break;
      case "languageSetting":
        return <ProfileEdit />;
        break;
      case "accountSetting":
        return <ProfileEdit />;
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

export default Edit;
