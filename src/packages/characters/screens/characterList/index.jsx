import React, { useEffect, useState } from "react";
import { Layout, Pagination, Button, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import banner from "../../../../assets/banner.png";

import { fetchByPage, selectCharacters, STATE } from "../../redux";

import styles from "./styles.module.css";
import CardsSkeleton from "./components/CardsSkeleton";
import { getRouteToCharecterDetail } from "../../constants";
import Header from "../../components/Header";

const { Sider, Content } = Layout;
const { Meta } = Card;

function CharacterList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, status, info } = useSelector(selectCharacters);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleFetchPage = (page) => {
    dispatch(fetchByPage(page));
  };

  const redirectToDetails = (id) => {
    console.log("id: ", id);
    navigate(getRouteToCharecterDetail(id));
  };

  useEffect(() => {
    console.log("effect...");
    dispatch(fetchByPage(1));
  }, [dispatch]);

  return (
    <Layout className={styles.mainContainer}>
      <Header setCollapse={setIsCollapsed} isCollapsed={isCollapsed} />
      <Layout className={styles.siteLayout}>
        <Sider trigger={null} collapsible collapsed={isCollapsed}>
          <Button onClick={handleFetchPage}>Fetch!</Button>
        </Sider>
        <Content className={styles.content}>
          <div className={styles.characters}>
            {status === STATE.LOADING ? (
              <CardsSkeleton />
            ) : (
              data?.map((char) => (
                <Card
                  onClick={() => redirectToDetails(char.id)}
                  key={char.id}
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt={char.name} src={char.image} />}
                >
                  <Meta title={char.name} description={char.species} />
                  <Meta description={char.status} />
                </Card>
              ))
            )}
          </div>
          {info && (
            <Pagination
              defaultCurrent={1}
              total={info.count}
              pageSize={20}
              showSizeChanger={false}
              onChange={handleFetchPage}
            />
          )}
        </Content>
      </Layout>
    </Layout>
  );
}

export default CharacterList;
