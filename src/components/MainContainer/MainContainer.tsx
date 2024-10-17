import React, { ReactNode } from "react";


import { Header } from "../Header";

import styles from "./MainContainer.module.scss";

type Props = {
  children: ReactNode;
};

const MainContainer = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <Header heading="Create new Schedule"/>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default MainContainer;
