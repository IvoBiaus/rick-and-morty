import React from "react";
import { Skeleton, Card } from "antd";

import styles from "./styles.module.css";

const { Meta } = Card;

function CardsSkeleton() {
  return [...Array(20)].map((e, i) => (
    <Card className={styles.card} key={i}>
      <div className={styles.cardAvatar}>
        <Skeleton.Image />
      </div>
      <Skeleton loading={true} active>
        <Meta title="Card title" description="This is the description" />
      </Skeleton>
    </Card>
  ));
}

export default CardsSkeleton;
