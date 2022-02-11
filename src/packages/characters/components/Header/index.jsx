import React from "react";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";

import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import banner from "../../../../assets/banner.png";

import styles from "./styles.module.css";
import { PATHS } from "../../constants";

function Header({ setCollapse = null, isCollapsed = false }) {
  const navigate = useNavigate();

  const redirectToCharacters = () => {
    navigate(PATHS.BASE_URL);
  };

  return (
    <Layout.Header className={styles.header}>
      <img
        onClick={redirectToCharacters}
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
