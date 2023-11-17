import React, { useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  UserOutlined,
  SearchOutlined,
  LoginOutlined,
  MessageOutlined,
  ExclamationOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LoadingOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as screenActions from "../reducers/screen";
import { logOut, getMyInfo } from "../reducers/user";

const { Header, Content, Footer, Sider } = Layout;
const AppLayout = ({ children }) => {
  const dispatch = useDispatch();

  const { collapsed } = useSelector((state) => state.screen);
  const { isLoggedIn, logOutLoading, me } = useSelector((state) => state.user);

  const { selectedMenu } = useSelector((state) => state.screen);

  const LogOutRequest = useCallback(() => {
    dispatch(logOut());
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = useMemo(() => {
    return [
      {
        key: "HOME",
        icon: React.createElement(HomeOutlined),
        label: <a href="http://localhost:3060">홈</a>,
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
            label: <Link href="http://localhost:3060/login">로그인</Link>,
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
            icon: React.createElement(FileAddOutlined),
            label: <Link href="/post">만들기</Link>,
          }
        : {
            key: "POST",
            icon: React.createElement(FileAddOutlined),
            label: "만들기",
            disabled: true,
          },
      isLoggedIn
        ? {
            key: "PROFILE",
            icon: React.createElement(UserOutlined),
            label: <Link href={`/profile/${me.nickname}`}>프로필</Link>,
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
              logOutLoading ? LoadingOutlined : LogoutOutlined
            ),
            label: <a href="http://localhost:3060">로그아웃</a>,
            onClick: LogOutRequest,
          }
        : null,
      {
        key: "TEST",
        icon: React.createElement(LoginOutlined),
        label: <Link href="/test">테스트</Link>,
      },
    ];
  }, [isLoggedIn, logOutLoading]);

  return (
    <Layout hasSider>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => {
          dispatch(screenActions.collapsed());
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
              dispatch(screenActions.collapsed());
            }}
            style={{
              marginLeft: collapsed ? 72 : 200,
              fontSize: "15px",
              width: 64,
              height: 64,
            }}
          />

          <a href="https://github.com/hyukjinKimm">
            SNS-PROJECT @2023 Made by HYUKJIN KIM
          </a>
        </Header>
        <Content
          style={{
            minHeight: "100vh",
            marginLeft: collapsed ? 70 : 200,
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

export default AppLayout;
