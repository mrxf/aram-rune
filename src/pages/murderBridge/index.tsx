import { useRequest } from "ahooks";
import { Card, Input, Modal, notification, Radio, Row, Col } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import { AxiosResponse } from "axios";
import classNames from "classnames";
import React, { ChangeEvent, useCallback, useState } from "react";
import RuneViewer from "./components/runeViewer";
import { heroTypeMap, IHeroType } from "./heroTypeMap";
import styles from "./index.module.less";

const { Search } = Input;
const imageResoucePrefix = `//game.gtimg.cn/images/lol/act/img/champion`;
interface MurderBridgeProps {}

const MurderBridge: React.FC<MurderBridgeProps> = () => {
  /** 过滤的英雄列表 */
  const [filterHero, setFilterHero] = useState<murderBridge.Hero[] | undefined>(
    undefined
  );
  const [searchWord, setSearchWord] = useState<string>("");
  /** 选择的英雄类型 */
  const [hearoType, setHearoType] = useState<keyof typeof heroTypeMap | "all">(
    "all"
  );
  const [viewHero, setViewHero] = useState<murderBridge.Hero | null>(null);

  /** 获取英雄列表数据 */
  const { data: heroResponse, loading: isFetching } = useRequest<
    AxiosResponse<murderBridge.heroList>
  >(
    {
      method: "GET",
      url: "https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js",
    },
    {
      onSuccess(response) {
        if (response.status === 200) {
          setFilterHero(response.data.hero);
        } else {
          notification.error({
            message: "请求英雄列表数据失败",
            duration: 0,
          });
        }
      },
    }
  );

  /** 过滤英雄名字 */
  const onFilter = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      // 每次搜索都清空其他过滤条件
      setHearoType("all");
      setSearchWord(value);
      if (!value) {
        setFilterHero(heroResponse?.data.hero);
      } else {
        const heros = heroResponse?.data.hero.filter((item) =>
          item.keywords.split(",").includes(value)
        );
        setFilterHero(heros);
      }
    },
    [heroResponse]
  );

  /** 筛选英雄类型 */
  const handlerChangeType = useCallback(
    ({ target: { value } }: RadioChangeEvent) => {
      setHearoType(value);
      setSearchWord("");
      if (value === "all") {
        setFilterHero(heroResponse?.data.hero);
      } else {
        const heros = heroResponse?.data.hero.filter((item) =>
          item.roles.includes(value)
        );
        setFilterHero(heros);
      }
    },
    [heroResponse]
  );

  const handleEnter = useCallback(() => {
    if (filterHero && filterHero.length > 0) {
      setViewHero(filterHero[0]);
    } else {
      notification.error({ message: "没有搜索到英雄呀！" });
    }
  }, [filterHero]);

  return (
    <>
      <Card className={styles.md16}>
        <Row justify="space-between" align="middle">
          <Col md={8} sm={24} className={styles.mb16}>
            <Search
              placeholder="搜索英雄，回车查看第一个"
              allowClear
              enterButton
              size="large"
              onChange={onFilter}
              value={searchWord}
              onPressEnter={handleEnter}
            />
          </Col>
          <Col md={12} sm={24}>
            <Radio.Group value={hearoType} onChange={handlerChangeType}>
              <Radio.Button value="all">全部</Radio.Button>
              {Object.keys(heroTypeMap).map((key) => (
                <Radio.Button value={key} key={key}>
                  {heroTypeMap[key as IHeroType]}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Col>
        </Row>
      </Card>
      <Card loading={isFetching}>
        {heroResponse?.data.hero?.map((hero) => (
          <div
            className={classNames(styles.heroContainer, {
              [styles.show]:
                (filterHero?.findIndex((item) => item.alias === hero.alias) ??
                  -1) > -1,
            })}
            onClick={() => setViewHero(hero)}
            key={hero.alias}
          >
            <img
              src={`${imageResoucePrefix}/${hero.alias}.png`}
              alt={hero.title}
            />
            <span>{hero.title}</span>
          </div>
        ))}
      </Card>
      <Modal
        title={`${viewHero?.title}的天赋推荐`}
        footer={null}
        visible={!!viewHero}
        width={750}
        onCancel={() => setViewHero(null)}
        className={styles.runeModal}
        destroyOnClose
      >
        <RuneViewer alias={viewHero?.alias} />
      </Modal>
    </>
  );
};

export default MurderBridge;
