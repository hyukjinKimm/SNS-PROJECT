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
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import Link from "next/link";

import { Layout, Menu, theme, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
const { Header, Content, Footer, Sider } = Layout;

import { logOutAction } from "../reducers/user";
const AppLayout2 = ({ children }) => {
  const dispatch = useDispatch();

  const { collapsed } = useSelector((state) => state.screen);
  const { isLoggedIn } = useSelector((state) => state.user);
  const { selectedMenu } = useSelector((state) => state.screen);
  const onChangeMenu = useCallback((e) => {
    if (e.key === "LOGOUT") {
      return dispatch({ type: "CHANGE_MENU", data: "HOME" });
    }
    dispatch({ type: "CHANGE_MENU", data: e.key });
  }, []);
  const LogOutRequest = useCallback(() => {
    dispatch(logOutAction());
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = useMemo(() => {
    return [
      {
        key: "HOME",
        icon: React.createElement(HomeOutlined),
        label: <Link href="/">홈</Link>,
      },
      {
        key: "SEARCH",
        icon: React.createElement(SearchOutlined),
        label: <Link href="/">검색</Link>,
      },
      isLoggedIn
        ? null
        : {
            key: "LOGIN",
            icon: React.createElement(LoginOutlined),
            label: <Link href="/login">로그인</Link>,
          },
      isLoggedIn
        ? {
            key: "MESSAGE",
            icon: React.createElement(MessageOutlined),
            label: "메시지",
          }
        : {
            key: "MESSAGE",
            icon: React.createElement(MessageOutlined),
            label: "메시지",
            disabled: true,
          },
      isLoggedIn
        ? {
            key: "NOTICE",
            icon: React.createElement(ExclamationOutlined),
            label: "알림",
          }
        : {
            key: "NOTICE",
            icon: React.createElement(ExclamationOutlined),
            label: "알림",
            disabled: true,
          },
      isLoggedIn
        ? {
            key: "POST",
            icon: React.createElement(FormOutlined),
            label: <Link href="/post">만들기</Link>,
          }
        : {
            key: "POST",
            icon: React.createElement(FormOutlined),
            label: "만들기",
            disabled: true,
          },
      isLoggedIn
        ? {
            key: "PROFILE",
            icon: React.createElement(UserOutlined),
            label: <Link href="/profile">프로필</Link>,
          }
        : {
            key: "PROFILE",
            icon: React.createElement(UserOutlined),
            label: "프로필",
            disabled: true,
          },
      isLoggedIn
        ? {
            key: "LOGOUT",
            icon: React.createElement(LogoutOutlined),
            label: <Link href="/">로그아웃</Link>,
            onClick: LogOutRequest,
          }
        : null,
    ];
  }, [isLoggedIn]);

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
          selectedKeys={selectedMenu}
          items={items}
          onClick={onChangeMenu}
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
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => {
              dispatch({
                type: "COLLAPSED_EVENT",
              });
            }}
            style={{
              marginLeft: collapsed ? 70 : 200,
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            minHeight: "100vh",
            marginLeft: collapsed ? 100 : 200,
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
