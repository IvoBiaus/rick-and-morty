import React, { useEffect } from "react";
import { Layout, Tabs, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";

import { fetchById, selectCharacters, STATE } from "../../redux";
import styles from "./styles.module.css";
import Header from "../../components/Header";
import DetailsSkeleton from "./components/DetailsSkeleton";

const { TabPane } = Tabs;
const { Content } = Layout;

function CharacterDetail() {
  let { characterId } = useParams();
  const dispatch = useDispatch();
  const { data, status } = useSelector(selectCharacters);

  useEffect(() => {
    dispatch(fetchById(characterId));
  }, [dispatch]);

  return (
    <Layout className={styles.mainContainer}>
      <Header />
      <Content className={styles.content}>
        {status === STATE.LOADING && <DetailsSkeleton />}
        {status === STATE.IDLE && !!data?.id && (
          <>
            <div className={styles.info}>
              <img src={data.image} alt={data.name} />
              <div className={styles.infoData}>
                <span>
                  Id: <span>{data.id}</span>
                </span>
                <span>
                  Name: <span>{data.name}</span>
                </span>
                <span>
                  Status: <span>{data.status}</span>
                </span>
                <span>
                  Specie: <span>{data.species}</span>
                </span>
                <span>
                  Type: <span>{data.type || "---"}</span>
                </span>
                <span>
                  Gender: <span>{data.gender}</span>
                </span>
                <span>
                  Origin: <span>{data.origin.name}</span>
                </span>
                <span>
                  Created:{" "}
                  <span>{moment(data.created).format("MMMM DD, YYYY")}</span>
                </span>
              </div>
            </div>
            <div className={styles.episodes}>
              <span className={styles.episodesTitle}>Episodes Info</span>
              <Tabs
                type="card"
                tabPosition="top"
                className={styles.tabsContainer}
              >
                {data.episodes?.map((ep) => {
                  return (
                    <TabPane tab={`Episode ${ep.id}`} key={ep.id}>
                      <Card>
                        <div className={styles.tabContent}>
                          <span>
                            Episode ID: <span>{ep.id}</span>
                          </span>
                          <span>
                            Episode Name: <span>{ep.name}</span>
                          </span>
                          <span>
                            Episode Air Date: <span>{ep.air_date}</span>
                          </span>
                          <span>
                            Episode: <span>{ep.episode}</span>
                          </span>
                        </div>
                      </Card>
                    </TabPane>
                  );
                })}
              </Tabs>
            </div>
          </>
        )}
      </Content>
    </Layout>
  );
}

export default CharacterDetail;
