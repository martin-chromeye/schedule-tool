import React, { ReactNode } from "react";


import styles from "./MainContainer.module.scss";
import { Header } from "../Header";

type Props = {
  children: ReactNode;
};

const MainContainer = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default MainContainer;
