import React, { useState, useCallback, useMemo, useEffect } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { Menu, Input, Row, Col, Button } from "antd";

import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import { useDispatch, useSelector } from "react-redux";

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  console.log(me);
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    console.log("LogOut 실행");
    dispatch({ type: "LOG_OUT_REQUEST" });
  }, []);

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
        label: <Link href="/friends">친구</Link>,
      },
      {
        label: <Link href="/profile">프로필</Link>,
      },
      {
        label: <Link href="/login">로그인</Link>,
      },
      me
        ? {
            label: <Button onClick={onLogOut}>LogOut</Button>,
          }
        : null,
    ];
  }, [me]);

  return (
    <div>
      <Menu style={{}} mode="horizontal" items={items} />
      <Row gutter={8}>
        {/* xs: 모바일 sm: 태블릿 md: 데스크탑 */}
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : null}
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
