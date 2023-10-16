import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  LoadingOutlined,
} from "@ant-design/icons";
import Link from "next/link";

import { Layout, Menu, theme, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
const { Header, Content, Footer, Sider } = Layout;

import { logOutRequestAction } from "../reducers/user";
import { useRouter } from "next/router";
import { CHANGE_MENU, CLICK_LOGIN_MENU } from "../reducers/screen";
const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { collapsed } = useSelector((state) => state.screen);
  const { isLoggedIn, isLoggingOut } = useSelector((state) => state.user);
  const { selectedMenu } = useSelector((state) => state.screen);
  const onChangeMenu = useCallback((e) => {
    dispatch({ type: "CHANGE_MENU", data: e.key });
  }, []);
  const LogOutRequest = useCallback(() => {
    dispatch(logOutRequestAction());
  }, []);

  useEffect(() => {
    switch (selectedMenu) {
      case "HOME":
        router.push("/");
        break;
      case "SEARCH":
        router.push("/search");
        break;
      case "LOGIN":
        router.push("/login");
        break;
      case "PROFILE":
        router.push("/profile");
        break;
    }
  }, [selectedMenu]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = useMemo(() => {
    return [
      {
        key: "HOME",
        icon: React.createElement(HomeOutlined),
        label: "홈",
      },
      {
        key: "SEARCH",
        icon: React.createElement(SearchOutlined),
        label: "검색",
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
            label: "프로필",
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
            icon: React.createElement(
              isLoggingOut ? LoadingOutlined : LogoutOutlined
            ),
            label: "로그아웃",
            onClick: LogOutRequest,
          }
        : null,
    ];
  }, [isLoggedIn, isLoggingOut]);

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
AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppLayout;
