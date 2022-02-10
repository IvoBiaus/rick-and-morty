import React from "react";
import { Layout } from "antd";

import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import banner from "../../../../assets/banner.png";

import styles from "./styles.module.css";

function Header({ setCollapse = null, isCollapsed = false }) {
  return (
    <Layout.Header className={styles.header}>
      <img
        alt="Rick and Morty Banner"
        src={banner}
        className={styles.headerLogo}
      />
      {setCollapse &&
        (isCollapsed ? (
          <MenuUnfoldOutlined onClick={() => setCollapse(false)} />
        ) : (
          <MenuFoldOutlined onClick={() => setCollapse(true)} />
        ))}
    </Layout.Header>
  );
}

export default Header;
