import React from "react";
import { Skeleton } from "antd";

import styles from "./styles.module.scss";

function DetailsSkeleton() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.info}>
        <Skeleton.Image className={styles.image} />
        <Skeleton active />
      </div>
      <Skeleton active />
    </div>
  );
}

export default DetailsSkeleton;
