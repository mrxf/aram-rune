import { useRequest } from "ahooks";
import { Card, Input, notification } from "antd";
import { AxiosResponse } from "axios";
import classNames from "classnames";
import React, { ChangeEvent, useCallback, useState } from "react";
import styles from "./index.module.less";

const { Search } = Input;
const imageResoucePrefix = `https://game.gtimg.cn/images/lol/act/img/champion`;
interface MurderBridgeProps {}

const MurderBridge: React.FC<MurderBridgeProps> = () => {
  const [filterHero, setFilterHero] = useState<murderBridge.Hero[] | undefined>(
    undefined
  );

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

  const onFilter = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
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

  return (
    <>
      <Card>
        <Search
          placeholder="搜索英雄，回车查看第一个"
          allowClear
          enterButton
          size="large"
          className={styles.search}
          onChange={onFilter}
          onPressEnter={ () => notification.success({ message: '第一个呀' }) }
        />
      </Card>
      <Card loading={isFetching}>
        {heroResponse?.data.hero?.map((hero) => (
          <div
            className={classNames(styles.heroContainer, {
              [styles.show]: (filterHero?.findIndex(
                (item) => item.alias === hero.alias
              ) ?? -1) > -1,
            })}
          >
            <img
              src={`${imageResoucePrefix}/${hero.alias}.png`}
              alt={hero.title}
            />
            <span>
              {hero.name}-{hero.title}
            </span>
          </div>
        ))}
      </Card>
    </>
  );
};

export default MurderBridge;
