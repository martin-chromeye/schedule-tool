import React, { ReactNode } from "react";
import { addClass } from "../../utils/addClass";

import styles from "./Wrapper.module.scss";

type Props = {
  children: ReactNode;
  className?: string;
};

const Wrapper = ({ children, className = "" }: Props) => {
  return <div className={addClass(styles.wrapper, className)}>{children}</div>;
};

export default Wrapper;
