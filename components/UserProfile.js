import React, { useState, useCallback } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Layout } from "antd";
const { Meta } = Card;

const { Header, Content, Footer, Sider } = Layout;

const UserProfile = () => {
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
            avatar={
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
            }
            title="Card title"
            description="This is the description"
          />
        </Card>
      </div>
    </>
  );
};

export default UserProfile;
