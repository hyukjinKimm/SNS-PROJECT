import React from "react";
import { Layout, theme, Button } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import AppLayout from "../components/AppLayout";
import { useDispatch, useSelector } from "react-redux";
const { Header, Content, Footer, Sider } = Layout;
function Home(props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const collapsed = useSelector((state) => state.screen);
  const dispatch = useDispatch();
  return (
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
  );
}

export default Home;
