import React from "react";
import { Layout, Select, Input, Drawer } from "antd";
import classnames from "classnames";

import styles from "./styles.module.scss";

const { Sider } = Layout;
const { Option } = Select;
const { Search } = Input;

function Sidebar({
  onClose,
  isVisible,
  onGenderChange,
  onStatusChange,
  onNameChange,
}) {
  const content = (
    <div className={styles.filtersContainer}>
      <h2 className={styles.filtersTitle}>Filters</h2>
      <Search placeholder="Name" allowClear onSearch={onNameChange} />
      <br />
      <Select allowClear placeholder="Status" onChange={onStatusChange}>
        <Option value="unknown">Unknown</Option>
        <Option value="alive">Alive</Option>
        <Option value="dead">Dead</Option>
      </Select>
      <br />
      <Select allowClear placeholder="Gender" onChange={onGenderChange}>
        <Option value="unknown">Unknown</Option>
        <Option value="male">Male</Option>
        <Option value="female">Female</Option>
      </Select>
    </div>
  );

  return (
    <>
      <Sider
        trigger={null}
        className={classnames(styles.sidebar, styles.desktop)}
      >
        {content}
      </Sider>
      <Drawer
        title="Filter"
        placement="left"
        onClose={onClose}
        visible={isVisible}
        className={classnames(styles.drawer, styles.mobile)}
      >
        {content}
      </Drawer>
    </>
  );
}

export default Sidebar;
