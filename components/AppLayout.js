import React, { useState, useCallback, useMemo, useEffect } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { Menu, Input, Row, Col, Button } from "antd";

import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";

const AppLayout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const onLogOut = useCallback(() => {
    console.log("LogOut 실행");
    setIsLoggedIn(false);
  }, [isLoggedIn]);

  const items = useMemo(() => {
    return [
      {
        label: <a href="/">Home</a>,
      },
      {
        label: (
          <Input.Search
            placeholder="검색"
            enterButton="Search"
            style={{ verticalAlign: "middle" }}
          />
        ),
      },
      {
        label: <a href="/friends">친구</a>,
      },
      {
        label: <a href="/profile">프로필</a>,
      },
      {
        label: <a href="/signup">회원가입</a>,
      },
      isLoggedIn
        ? {
            label: <Button onClick={onLogOut}>LogOut</Button>,
          }
        : null,
    ];
  }, [isLoggedIn]);

  return (
    <div>
      <Menu style={{}} mode="horizontal" items={items} />
      <Row gutter={8}>
        {/* xs: 모바일 sm: 태블릿 md: 데스크탑 */}
        <Col xs={24} md={6}>
          {isLoggedIn ? (
            <UserProfile />
          ) : (
            <LoginForm setIsLoggedIn={setIsLoggedIn} />
          )}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://github.com/hyukjinKimm"
            target="_blank"
            rel="noreferrer noopener"
          >
            made by HyukJinKim
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppLayout;
