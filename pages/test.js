import React, { use, useMemo, useState } from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  SearchOutlined,
  LoginOutlined,
  MessageOutlined,
  ExclamationOutlined,
  FormOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;

const App = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
            }}
          >
            <p>long content</p>
            {
              // indicates very long content
              Array.from(
                {
                  length: 100,
                },
                (_, index) => (
                  <React.Fragment key={index}>
                    {index % 20 === 0 && index ? "more" : "..."}
                    <br />
                  </React.Fragment>
                )
              )
            }
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
