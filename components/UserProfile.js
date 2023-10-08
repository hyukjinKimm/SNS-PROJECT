import React, { useState, useCallback } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  SettingFilled,
} from "@ant-design/icons";
import { Avatar, Card, Button } from "antd";
const { Meta } = Card;

import styled from "styled-components";

const UserProfile = () => {
  return (
    <>
      <Card
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <div key="posts">
            게시글
            <br />0
          </div>,
          <div key="followings">
            팔로잉
            <br />0
          </div>,
          <div key="follwers">
            팔로워
            <br />0
          </div>,
        ]}
      >
        {/* <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />*/}
        <Meta
          avatar={<Avatar>HJ</Avatar>}
          title="HyukJin Kim"
          description="This is the description"
        />
      </Card>
    </>
  );
};

export default UserProfile;
