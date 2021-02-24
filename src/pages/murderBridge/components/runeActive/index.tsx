import { Col, Grid, Row } from "antd";
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

const { useBreakpoint } = Grid;

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

  const screens = useBreakpoint();

  return (
    <div className={styles.runeContainer}>
      <Row justify="space-between">
        <Col md={12} sm={24}>
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
        </Col>
        {
          !screens.md ?
          <div className={styles.runeDivider} /> : undefined
        }
        <Col md={12} sm={24}>
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
        </Col>
      </Row>
    </div>
  );
};

export default RuneActive;
