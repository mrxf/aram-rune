import classNames from "classnames";
import React from "react";
import styles from "./index.module.less";

interface RuneProps {
  id: string | number;
  active: boolean;
  size?: "default" | "small" | "large" | "mini";
}

const runeImagePrefix =
  "//lol.qq.com/act/a20170926preseason/img/runeBuilder/runes/108x108";

const Rune: React.FC<RuneProps> = ({ active, id, size }) => {
  return (
    <div
      className={classNames(styles.runeContainer, {
        [styles.active]: active,
        [styles.mini]: size === "mini",
        [styles.small]: size === "small",
        [styles.large]: size === "large",
        [styles.default]: size === "default",
      })}
    >
      <img src={`${runeImagePrefix}/${id}.png`} alt={id.toString()} />
    </div>
  );
};

export default Rune;
