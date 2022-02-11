import React, { useEffect, useRef, useState } from "react";
import { Layout, Pagination, Button, Card, Select, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ArrowUpOutlined } from "@ant-design/icons";

import { fetchByPage, selectCharacters, STATE } from "../../redux";
import { getRouteToCharecterDetail } from "../../constants";
import Header from "../../components/Header";
import useOnScreen from "../../../utils/hooks/useOnScreen";

import CardsSkeleton from "./components/CardsSkeleton";
import styles from "./styles.module.css";

const { Sider, Content } = Layout;
const { Meta } = Card;
const { Option } = Select;
const { Search } = Input;

function CharacterList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const topRef = useRef();
  const isVisible = useOnScreen(topRef);
  const { data, status, info } = useSelector(selectCharacters);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [filters, setFilters] = useState({});

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

  useEffect(() => {
    console.log("effect b");
    dispatch(fetchByPage({ page: 1 }));
  }, [dispatch]);

  return (
    <Layout className={styles.mainContainer}>
      <Header setCollapse={setIsCollapsed} isCollapsed={isCollapsed} />
      <Layout>
        <Sider trigger={null} collapsible collapsed={isCollapsed}>
          <div className={styles.filtersContainer}>
            <h2 className={styles.filtersTitle}>Filters</h2>
            <Search placeholder="Name" allowClear onSearch={handleNameFilter} />
            <br />
            <Select
              allowClear
              placeholder="Status"
              onChange={handleStatusFilter}
            >
              <Option value="unknown">Unknown</Option>
              <Option value="alive">Alive</Option>
              <Option value="dead">Dead</Option>
            </Select>
            <br />
            <Select
              allowClear
              placeholder="Gender"
              onChange={handleGenderFilter}
            >
              <Option value="unknown">Unknown</Option>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </div>
        </Sider>
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
