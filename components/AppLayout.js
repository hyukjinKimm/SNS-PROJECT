import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { Menu } from "antd";
const items = [
  {
    label: <a href="/">Home</a>,
  },
  {
    label: <a href="/profile">profile</a>,
  },
  {
    label: <a href="/signup">signup</a>,
  },
];
const AppLayout = ({ children }) => {
  return (
    <div>
      <Menu style={{}} mode="horizontal" items={items} />

      {children}
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppLayout;
