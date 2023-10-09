import React, { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  UserOutlined,
  SearchOutlined,
  LoginOutlined,
  MessageOutlined,
  ExclamationOutlined,
  FormOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useSelector } from "react-redux";
const { Header, Content, Footer, Sider } = Layout;

const AppLayout2 = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const onClick = useCallback((e) => {
    console.log(e);
  }, []);
  const items = useMemo(() => {
    return [
      { key: "home", icon: React.createElement(HomeOutlined), label: "홈" },
      {
        key: "search",
        icon: React.createElement(SearchOutlined),
        label: "검색",
      },
      isLoggedIn
        ? null
        : {
            key: "login",
            icon: React.createElement(LoginOutlined),
            label: "로그인",
          },
      isLoggedIn
        ? {
            key: "message",
            icon: React.createElement(MessageOutlined),
            label: "메시지",
          }
        : {
            key: "message",
            icon: React.createElement(MessageOutlined),
            label: "메시지",
            disabled: true,
          },
      isLoggedIn
        ? {
            key: "notice",
            icon: React.createElement(ExclamationOutlined),
            label: "알림",
          }
        : {
            key: "notice",
            icon: React.createElement(ExclamationOutlined),
            label: "알림",
            disabled: true,
          },
      isLoggedIn
        ? {
            key: "post",
            icon: React.createElement(FormOutlined),
            label: "만들기",
          }
        : {
            key: "post",
            icon: React.createElement(FormOutlined),
            label: "만들기",
            disabled: true,
          },
      isLoggedIn
        ? {
            key: "",
            icon: React.createElement(UserOutlined),
            label: "프로필",
          }
        : {
            key: "",
            icon: React.createElement(UserOutlined),
            label: "프로필",
            disabled: true,
          },
    ];
  }, []);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { collapsed } = useSelector((state) => state.screen);
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
          onClick={onClick}
        />
      </Sider>
      {children}
    </Layout>
  );
};
AppLayout2.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppLayout2;
