import React from "react";

import styles from "./HintMsg.module.scss";

type Props = { unsortedDays: string[] };

const HintMsg = ({ unsortedDays }: Props) => {
  return (
    <span className={styles.hint}>
      Unsorted times added for {`${unsortedDays.length > 1 ? "days" : "day"}`}:{" "}
      {unsortedDays.join(", ")}
    </span>
  );
};

export default HintMsg;
