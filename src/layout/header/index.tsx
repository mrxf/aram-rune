import React from "react";
import HeadBreadcrumb from "../headBreadcrumb";
import styles from "./index.module.less";
interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className={styles.header}>
      <HeadBreadcrumb />
    </div>
  );
};

export default Header;
