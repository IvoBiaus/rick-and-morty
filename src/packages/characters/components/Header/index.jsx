import React from "react";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";

import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import { PATHS } from "../../constants";
import banner from "../../../../assets/banner.png";

import styles from "./styles.module.scss";

function Header({ setVisible = null, isVisible = false }) {
  const navigate = useNavigate();

  const redirectToCharacters = () => {
    navigate(PATHS.BASE_URL);
  };

  return (
    <Layout.Header className={styles.header}>
      {setVisible &&
        (isVisible ? (
          <MenuUnfoldOutlined
            className={styles.collapseButton}
            onClick={() => setVisible(false)}
          />
        ) : (
          <MenuFoldOutlined
            className={styles.collapseButton}
            onClick={() => setVisible(true)}
          />
        ))}
      <img
        onClick={redirectToCharacters}
        alt="Rick and Morty Banner"
        src={banner}
        className={styles.headerLogo}
      />
    </Layout.Header>
  );
}

export default Header;
