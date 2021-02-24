import classNames from "classnames";
import React from "react";
import { mainRuneIconMap } from "../../constants/runes";
import styles from "./index.module.less";

interface BuildRuneProps {
  id: number;
  active?: boolean;
}

const runeAssetsPrefix = `https://lol.qq.com/act/a20170926preseason/img/runeBuilder/assets`;

const BuildRune: React.FC<BuildRuneProps> = ({ id, active }) => {
  const runeKey = mainRuneIconMap[id];
  const resourceKey = runeKey.charAt(0).toLocaleLowerCase();
  return (
    <div
      className={classNames(styles.runeContainer, {
        [styles.active]: !!active,
      })}
    >
      {!!active ? (
        <img
          src={`${runeAssetsPrefix}/${runeKey}/vfx-${resourceKey}.png`}
          alt={id.toString()}
          className={styles.vfx}
        />
      ) : undefined}
      <img
        src={`${runeAssetsPrefix}/${runeKey}/icon-${resourceKey}.png`}
        alt={id.toString()}
      />
    </div>
  );
};

export default BuildRune;
