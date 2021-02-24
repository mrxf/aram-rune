import { CaretRightOutlined, FireOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Collapse, Spin, Tag } from "antd";
import { AxiosResponse } from "axios";
import React from "react";
import QuickRuneView from "../quickRuneView";
import RuneActive from "../runeActive";
import styles from "./index.module.less";

const { Panel } = Collapse;
interface RuneViewerProps {
  alias?: string;
}

const RuneViewer: React.FC<RuneViewerProps> = ({ alias = "Aatrox" }) => {
  /** 获取英雄数据 */
  const { data: runeResponse, loading: isFetching } = useRequest<
    AxiosResponse<rune.RecommendData[]>
  >({
    method: "GET",
    url: `https://cdn.jsdelivr.net/npm/@champ-r/murderbridge/${alias}.json`,
  });
  return (
    <Spin spinning={isFetching}>
      <div className={styles.runePage}>
        {runeResponse && (
          <Collapse
            bordered={false}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            defaultActiveKey={["rune-0"]}
            accordion
          >
            {runeResponse.data[0].runes
              .filter((item, index) => index < 6)
              .map((runeData, index) => (
                <Panel
                  header={<QuickRuneView {...runeData} />}
                  key={`rune-${index}`}
                  extra={
                    index === 0 ? (
                      <Tag icon={<FireOutlined />} color="gold">
                        推荐
                      </Tag>
                    ) : undefined
                  }
                >
                  <RuneActive {...runeData} />
                </Panel>
              ))}
          </Collapse>
        )}
      </div>
    </Spin>
  );
};

export default RuneViewer;
