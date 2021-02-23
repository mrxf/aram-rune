import React, { ReactText } from "react";
import { FragmentMap, MainRuneMap, SubRuneMap } from "../../constants/runes";
import Rune from "../rune";
import styles from "./index.module.less";

interface RuneActiveProps {
  primaryStyleId: number;
  selectedPerkIds: ReactText[];
  subStyleId: number;
}

const RuneActive: React.FC<RuneActiveProps> = ({
  primaryStyleId,
  selectedPerkIds,
  subStyleId,
}) => {
  return (
    <div className={styles.runeContainer}>
      <div className={styles.primaryRune}>
        {MainRuneMap[primaryStyleId].map((runeList) => (
          <div className={styles.runeRow}>
            <Rune id={primaryStyleId} active />
            {runeList.map((runeId) => (
              <Rune
                id={runeId}
                active={selectedPerkIds.includes(runeId)}
                size="small"
              />
            ))}
          </div>
        ))}
      </div>
      <div className={styles.primaryRune}>
        {SubRuneMap[subStyleId].map((runeList) => (
          <div className={styles.runeRow}>
            {runeList.map((runeId) => (
              <Rune
                id={runeId}
                active={selectedPerkIds.includes(runeId)}
                size="small"
                key={runeId}
              />
            ))}
          </div>
        ))}
      </div>
      <div className={styles.fragmentRune}>
        {FragmentMap.map((runeList) => (
          <div className={styles.runeRow}>
            {runeList.map((runeId) => (
              <Rune
                id={runeId}
                active={selectedPerkIds.includes(runeId)}
                size="mini"
                key={runeId}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RuneActive;
