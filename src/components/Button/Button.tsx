import React, { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./Button.module.scss";
import { addClass } from "../../utils/addClass";

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

const Button = ({
  children,
  disabled = false,
  variant = "primary",
  ...rest
}: Props) => {
  const classes = addClass(
    styles.button,
    styles[variant],
    disabled ? styles.disabled : ""
  );

  return (
    <button className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default Button;
