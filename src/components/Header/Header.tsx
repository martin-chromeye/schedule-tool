import React from "react";

import { Wrapper } from "../Wrapper";

import styles from "./Header.module.scss";

type Props = { heading: string };

const Header = ({ heading }: Props) => {
  return (
    <header className={styles.header}>
      <Wrapper className={styles.wrapper}>
        <h1 className={styles.heading}>{heading}</h1>
      </Wrapper>
    </header>
  );
};

export default Header;
