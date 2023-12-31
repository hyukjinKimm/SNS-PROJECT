import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  UserOutlined,
  SearchOutlined,
  LoginOutlined,
  MessageOutlined,
  HeartOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LoadingOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  theme,
  Button,
  Badge,
  Avatar,
  Popover,
  Input,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as screenActions from "../reducers/screen";
import { logOut, searchUser } from "../reducers/user";
import Search from "./Search/search";
const { Header, Content, Footer, Sider } = Layout;
const AppLayout = ({ children }) => {
  const dispatch = useDispatch();

  const { collapsed } = useSelector((state) => state.screen);
  const {
    isLoggedIn,
    logOutLoading,
    me,
    searchingUser,
    searchUserError,
    searchUserLoading,
  } = useSelector((state) => state.user);

  const { selectedMenu } = useSelector((state) => state.screen);

  const LogOutRequest = useCallback(() => {
    dispatch(logOut());
  }, []);

  const onSearch = useCallback((value, _e, info) => {
    dispatch(searchUser({ nickname: value }));
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = useMemo(() => {
    return [
      {
        key: "HOME",
        icon: React.createElement(HomeOutlined, {
          style: {
            fontSize: "20px",
          },
        }),
        label: <a href="http://localhost:3060/">홈</a>,
      },
      {
        key: "SEARCH",
        icon: React.createElement(SearchOutlined, {
          style: {
            fontSize: "20px",
          },
        }),
        label: (
          <Popover
            placement="rightTop"
            title={"검색"}
            content={
              <div style={{ width: "400px" }}>
                <Input.Search
                  onSearch={onSearch}
                  placeholder="유저검색"
                  enterButton
                  loading={searchUserLoading}
                  style={{ marginBottom: 10 }}
                />

                <Search />
              </div>
            }
          >
            <div style={{ marginLeft: 0 }}>검색</div>
          </Popover>
        ),
      },
      isLoggedIn
        ? null
        : {
            key: "LOGIN",
            icon: React.createElement(LoginOutlined, {
              style: {
                fontSize: "20px",
              },
            }),
            label: <a href="http://localhost:3060/login">로그인</a>,
          },

      isLoggedIn
        ? {
            key: "MESSAGE",
            icon: (
              <Badge
                style={{
                  fontSize: 14,
                  textAlign: "center",
                }}
                count={2}
                size="small"
                offset={[2, 8]}
              >
                <MessageOutlined
                  style={{ fontSize: 20 }}
                  shape="square"
                  size="large"
                />
              </Badge>
            ),
            label: "메시지",
            onClick: () => {
              alert("기능 개발 중입니다.");
            },
          }
        : {
            key: "MESSAGE",
            icon: React.createElement(MessageOutlined, {
              style: {
                fontSize: "20px",
              },
            }),
            label: "메시지",
            disabled: true,
          },
      isLoggedIn
        ? {
            key: "ALARM",
            icon: (
              <Badge
                style={{
                  fontSize: 14,
                  textAlign: "center",
                }}
                count={5}
                size="small"
                offset={[2, 8]}
              >
                <HeartOutlined
                  shape="square"
                  size="large"
                  style={{
                    fontSize: "20px",
                  }}
                />
              </Badge>
            ),
            label: "알림",
            onClick: () => {
              alert("기능 개발 중입니다.");
            },
          }
        : {
            key: "ALARM",
            icon: React.createElement(HeartOutlined, {
              style: {
                fontSize: "20px",
              },
            }),
            label: "알림",
            disabled: true,
          },
      isLoggedIn
        ? {
            key: "POST",
            icon: React.createElement(FileAddOutlined, {
              style: {
                fontSize: "20px",
              },
            }),
            label: <Link href="/post">만들기</Link>,
          }
        : {
            key: "POST",
            icon: React.createElement(FileAddOutlined, {
              style: {
                fontSize: "20px",
              },
            }),
            label: "만들기",
            disabled: true,
          },
      isLoggedIn
        ? {
            key: "PROFILE",
            icon: React.createElement(UserOutlined, {
              style: {
                fontSize: "20px",
              },
            }),
            label: <Link href={`/profile/${me.nickname}`}>프로필</Link>,
          }
        : {
            key: "PROFILE",
            icon: React.createElement(UserOutlined, {
              style: {
                fontSize: "20px",
              },
            }),
            label: "프로필",
            disabled: true,
          },
      isLoggedIn
        ? {
            key: "LOGOUT",
            icon: React.createElement(
              logOutLoading ? LoadingOutlined : LogoutOutlined,
              {
                style: {
                  fontSize: "20px",
                },
              }
            ),
            label: <a href="http://localhost:3060">로그아웃</a>,
            onClick: LogOutRequest,
          }
        : null,
      {
        key: "NOTICE",
        icon: (
          <Badge
            style={{
              fontSize: 14,
              textAlign: "center",
            }}
            count={5}
            size="small"
            offset={[2, 8]}
          >
            <HeartOutlined
              shape="square"
              size="large"
              style={{
                fontSize: "20px",
              }}
            />
          </Badge>
        ),
        label: "공지사항",
        onClick: () => {
          alert("기능 개발 중입니다.");
        },
      },
    ];
  }, [isLoggedIn, logOutLoading, me]);

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
