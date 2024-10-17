import React from "react";

import styles from "./Header.module.scss";
import { Wrapper } from "../Wrapper";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className={styles.header}>
      <Wrapper className={styles.wrapper}>
        <h1 className={styles.heading}>Create new Schedule</h1>
      </Wrapper>
    </header>
  );
};

export default Header;
