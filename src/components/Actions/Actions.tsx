import React from "react";
import { Button } from "../Button";

import styles from "./Actions.module.scss";

type Props = {};

const Actions = (props: Props) => {
  const handleAutocompleteClick = () => {
    console.log("Autocomplete button clicked");
  };

  return (
    <div className={styles.container}>
      <Button variant="secondary">Reset</Button>
      <Button onClick={handleAutocompleteClick}>Autocomplete</Button>
      <Button variant="secondary">Upload</Button>
    </div>
  );
};

export default Actions;
