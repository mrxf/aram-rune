import { DownOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Menu, Modal, Skeleton } from "antd";
import classNames from "classnames";
import { get } from "lodash";
import React, { useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import About from "../about";
import style from "./index.module.less";

interface UserInfoProps {
  theme?: "light" | "dark";
}

const UserInfo: React.FC<UserInfoProps> = ({ theme = "dark" }) => {
  const { isValidating: isLogin, data: userData } = useSWR("/antd/userinfo");
  const [shouldAboutShow, setShouldAboutShow] = useState<boolean>(false);

  // 展示关于信息
  const onShowAbout = useCallback(() => {
    setShouldAboutShow(true);
  }, []);

  // 下拉菜单组件
  const infoMenus = useMemo(
    () => (
      <Menu>
        <Menu.Item>
          <Button type="link">退出</Button>
        </Menu.Item>
        <Menu.Item onClick={onShowAbout}>
          <Button type="link">关于</Button>
        </Menu.Item>
      </Menu>
    ),
    [onShowAbout]
  );

  return (
    <>
      {isLogin ? (
        <div className={style.userInfoSkeleton}>
          <Skeleton.Avatar active />
          <Skeleton.Button style={{ width: 150 }} active />
        </div>
      ) : (
        <Dropdown overlay={infoMenus}>
          <div
            className={classNames(style.username, {
              [style.__dark]: theme === "dark",
              [style.__light]: theme === "light",
            })}
          >
            <Avatar
              src={get(userData, "data.data.avatar")}
              size="small"
              className="mr-16"
            />
            欢迎您，{get(userData, "data.data.username")}
            <DownOutlined style={{ marginLeft: 8 }} />
          </div>
        </Dropdown>
      )}
      <Modal
        width={450}
        visible={shouldAboutShow}
        onCancel={() => setShouldAboutShow(false)}
        footer={null}
      >
        <About />
      </Modal>
    </>
  );
};

export default UserInfo;
