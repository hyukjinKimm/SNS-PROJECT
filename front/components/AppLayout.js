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
  FileAddOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import * as screenActions from "../reducerss/screen";
import { Layout, Menu, theme, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
const { Header, Content, Footer, Sider } = Layout;

import { logOut, getMyInfo } from "../reducerss/user";
import { useRouter } from "next/router";

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { collapsed } = useSelector((state) => state.screen);
  const { isLoggedIn, isLogOutLoading, isLogOutError, me } = useSelector(
    (state) => state.user
  );
  const { deletePostError, deleteCommentError } = useSelector(
    (state) => state.post
  );
  const { selectedMenu } = useSelector((state) => state.screen);
  const onChangeMenu = useCallback((e) => {
    dispatch(screenActions.changeMenu(e.key));
  }, []);
  const LogOutRequest = useCallback(() => {
    dispatch(logOut());
  }, []);
  useEffect(() => {
    if (isLogOutError) {
      alert(isLogOutError);
    }
  }, [isLogOutError]);
  useEffect(() => {
    dispatch(getMyInfo());
  }, []);
  useEffect(() => {
    if (deletePostError || deleteCommentError) {
      alert(deletePostError || deleteCommentError);
    }
  }, [deletePostError, deleteCommentError]);

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

            label: <Link href={`${me.nickname}`}>프로필</Link>,
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
              isLogOutLoading ? LoadingOutlined : LogoutOutlined
            ),
            label: "로그아웃",
            onClick: LogOutRequest,
          }
        : null,
      {
        key: "TEST",
        icon: React.createElement(LoginOutlined),
        label: <Link href="/test">테스트</Link>,
      },
    ];
  }, [isLoggedIn, isLogOutLoading]);

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
              dispatch(screenActions.collapsed());
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
