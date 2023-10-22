import React, { useState, useCallback } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Layout } from "antd";
import { useSelector } from "react-redux";
const { Meta } = Card;

const { Header, Content, Footer, Sider } = Layout;

const UserProfile = () => {
  const { me } = useSelector((state) => state.user);
  return (
    <>
      <div>
        <Card
          style={{
            width: 300,
          }}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            avatar={<Avatar>{me?.nickname[0]}</Avatar>}
            title={me?.nickname}
            description="This is the description"
          />
        </Card>
      </div>
    </>
  );
};

export default UserProfile;
