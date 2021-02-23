import React, { ReactText } from "react";
import Rune from "../rune";
import styles from "./index.module.less";

interface QuickRuneViewProps {
  selectedPerkIds: ReactText[];
}

const QuickRuneView: React.FC<QuickRuneViewProps> = ({ selectedPerkIds }) => {
  return (
    <div className={styles.listRune}>
      {selectedPerkIds.map((runeId) => (
        <Rune id={runeId} active size="mini" />
      ))}
    </div>
  );
};

export default QuickRuneView;
