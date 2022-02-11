import React, { useEffect, useRef, useState } from "react";
import { Layout, Pagination, Button, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ArrowUpOutlined } from "@ant-design/icons";

import { fetchByPage, selectCharacters, STATE } from "../../redux";
import { getRouteToCharecterDetail } from "../../constants";
import Header from "../../components/Header";
import useOnScreen from "../../../utils/hooks/useOnScreen";

import CardsSkeleton from "./components/CardsSkeleton";
import styles from "./styles.module.scss";
import Sidebar from "./components/Sidebar";

const { Content } = Layout;
const { Meta } = Card;

function CharacterList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const topRef = useRef();
  const isVisible = useOnScreen(topRef);
  const { data, status, info } = useSelector(selectCharacters);
  const [filters, setFilters] = useState({});
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const handleFetchPage = (page) => {
    dispatch(fetchByPage({ page, filters }));
  };

  const redirectToDetails = (id) => {
    navigate(getRouteToCharecterDetail(id));
  };

  const handleNameFilter = (name) => {
    const updatedFilters = { ...filters, name };
    dispatch(fetchByPage({ page: 1, filters: updatedFilters }));
    setFilters(updatedFilters);
  };

  const handleStatusFilter = (status) => {
    const updatedFilters = { ...filters, status };
    dispatch(fetchByPage({ page: 1, filters: updatedFilters }));
    setFilters(updatedFilters);
  };

  const handleGenderFilter = (gender) => {
    const updatedFilters = { ...filters, gender };
    dispatch(fetchByPage({ page: 1, filters: updatedFilters }));
    setFilters(updatedFilters);
  };

  const scrollToTop = () => {
    topRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const hideDrawer = () => {
    setIsDrawerVisible(false);
  };

  useEffect(() => {
    dispatch(fetchByPage({ page: 1 }));
  }, [dispatch]);

  return (
    <Layout className={styles.mainContainer}>
      <Sidebar
        isVisible={isDrawerVisible}
        onClose={hideDrawer}
        onGenderChange={handleGenderFilter}
        onNameChange={handleNameFilter}
        onStatusChange={handleStatusFilter}
      />
      <Layout>
        <Header setVisible={setIsDrawerVisible} isVisible={isDrawerVisible} />

        <Content className={styles.content}>
          <div ref={topRef} />
          <div className={styles.characters}>
            {status === STATE.LOADING && <CardsSkeleton />}
            {status === STATE.IDLE &&
              !!data?.length &&
              data.map((char) => (
                <Card
                  onClick={() => redirectToDetails(char.id)}
                  key={char.id}
                  hoverable
                  /* todo check to remove every style={{ */
                  style={{ width: 240 }}
                  cover={<img alt={char.name} src={char.image} />}
                >
                  <Meta title={char.name} description={char.species} />
                  <Meta description={char.status} />
                </Card>
              ))}
          </div>
          {!!info && (
            <Pagination
              defaultCurrent={1}
              total={info.count}
              pageSize={20}
              showSizeChanger={false}
              onChange={handleFetchPage}
            />
          )}
          {!isVisible && (
            <Button
              shape="circle"
              onClick={scrollToTop}
              className={styles.floatingButton}
              size="large"
              icon={<ArrowUpOutlined />}
            />
          )}
        </Content>
      </Layout>
    </Layout>
  );
}

export default CharacterList;
