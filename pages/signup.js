import Head from "next/head";
import AppLayout from "../components/AppLayout";
import SignUpForm from "../components/SignUpForm";

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

const SingUp = () => {
  const { collapsed } = useSelector((state) => state.screen);
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Head>
        <title>로그인 | SNS-PROJECT</title>
      </Head>
      <AppLayout>
        <Content
          style={{
            overflow: "initial",
          }}
        >
          <SignUpForm />
        </Content>
      </AppLayout>
    </>
  );
};

export default SingUp;
