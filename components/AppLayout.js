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
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import Link from "next/link";

import { Layout, Menu, theme, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
const { Header, Content, Footer, Sider } = Layout;

const AppLayout2 = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const onClick = useCallback((e) => {
    console.log(e);
  }, []);
  const items = useMemo(() => {
    return [
      {
        key: "home",
        icon: React.createElement(HomeOutlined),
        label: <Link href="/">홈</Link>,
      },
      {
        key: "search",
        icon: React.createElement(SearchOutlined),
        label: <Link href="/">검색</Link>,
      },
      isLoggedIn
        ? null
        : {
            key: "login",
            icon: React.createElement(LoginOutlined),
            label: <Link href="/login">로그인</Link>,
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
  const dispatch = useDispatch();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { collapsed } = useSelector((state) => state.screen);
  return (
    <Layout hasSider>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => {
          dispatch({
            type: "COLLAPSED_EVENT",
          });
        }}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 0,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        ></Header>
        <Content
          style={{
            marginLeft: 200,
            overflow: "initial",
          }}
        >
          {children}
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          SNS-PROJECT @2023 Made by HYUKJIN KIM <br />
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
AppLayout2.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppLayout2;
