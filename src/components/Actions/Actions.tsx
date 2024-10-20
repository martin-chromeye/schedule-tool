import React from "react";
import { Button } from "../Button";

import styles from "./Actions.module.scss";

type Props = {
  allDaysHaveTime: boolean;
  hasAtLeastOneTime: boolean;
  setTimes: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string[];
    }>
  >;
};

const Actions = ({ allDaysHaveTime, hasAtLeastOneTime, setTimes }: Props) => {
  const handleAutocompleteClick = () => {
    console.log("Autocomplete button clicked");
  };

  const handleReset = () => {
    setTimes({});
  };

  return (
    <div className={styles.container}>
      <Button
        disabled={!hasAtLeastOneTime}
        onClick={handleReset}
        variant="secondary"
      >
        Reset
      </Button>
      <Button disabled={!hasAtLeastOneTime} onClick={handleAutocompleteClick}>
        Autocomplete
      </Button>
      <Button variant="secondary" disabled={!allDaysHaveTime}>
        Upload
      </Button>
    </div>
  );
};

export default Actions;
