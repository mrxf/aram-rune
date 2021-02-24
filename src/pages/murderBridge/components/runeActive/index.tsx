import React, { ReactText } from "react";
import {
  FragmentMap,
  mainRuneIconMap,
  MainRuneMap,
  SubRuneMap,
} from "../../constants/runes";
import BuildRune from "../buildRune";
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
        <div className={styles.runeRow}>
          {Object.keys(mainRuneIconMap).map((id) => (
            <BuildRune
              id={parseInt(id)}
              active={id.toString() === primaryStyleId.toString()}
            />
          ))}
        </div>
        {MainRuneMap[primaryStyleId].map((runeList) => (
          <div className={styles.runeRow}>
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
        <div className={styles.runeRow}>
          {Object.keys(mainRuneIconMap)
            .filter((id) => id.toString() !== primaryStyleId.toString())
            .map((id) => (
              <BuildRune
                id={parseInt(id)}
                active={id.toString() === subStyleId.toString()}
              />
            ))}
        </div>
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
    </div>
  );
};

export default RuneActive;
