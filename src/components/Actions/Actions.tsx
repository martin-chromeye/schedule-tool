import React from "react";
import { Button } from "../Button";

import styles from "./Actions.module.scss";

type Props = {
  times: { [key: string]: string[] };
  setTimes: React.Dispatch<React.SetStateAction<{ [key: string]: string[] }>>;
  dates: Date[];
  allDaysHaveTime: boolean;
  hasAtLeastOneTime: boolean;
  handleReset: () => void;
  setHoveredTimes: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string[];
    } | null>
  >;
  hoveredTimes: {
    [key: string]: string[];
  } | null;
  setIsAutocompleteUsed: React.Dispatch<React.SetStateAction<boolean>>;
  isAutocompleteUsed: boolean;
};

const Actions = ({
  times,
  setTimes,
  dates,
  allDaysHaveTime,
  hasAtLeastOneTime,
  handleReset,
  setHoveredTimes,
  hoveredTimes,
  isAutocompleteUsed,
  setIsAutocompleteUsed,
}: Props) => {
  const getTemplate = (times: { [key: string]: string[] }) => {
    // Convert the times object into an array of [key, value] pairs and sort by date (key)
    const timeEntries = Object.entries(times).sort(([dateA], [dateB]) => {
      return new Date(dateA).getTime() - new Date(dateB).getTime();
    });

    // Find the last non-empty index
    const lastNonEmptyIndex =
      timeEntries.length -
      1 -
      timeEntries
        .slice()
        .reverse()
        .findIndex(([, times]) => times.length > 0);

    // Return the slice of timeEntries from the first to the last non-empty entry
    return timeEntries.slice(0, lastNonEmptyIndex + 1);
  };

  const fillTimesWithTemplate = (
    template: [string, string[]][],
    times: { [key: string]: string[] },
    dates: Date[]
  ) => {
    const result = { ...times };
    let templateIndex = 0;

    dates.forEach((date) => {
      const dateKey = date.toISOString().split("T")[0];
      result[dateKey] = [...template[templateIndex][1]]; // Copy the times from the template
      templateIndex = (templateIndex + 1) % template.length; // Cycle through the template
    });

    return result;
  };

  const handleAutocompleteHover = (applyTemplate: boolean) => {
    if (applyTemplate) {
      const template = getTemplate(times);
      const filledTimes = fillTimesWithTemplate(template, times, dates);
      setHoveredTimes(filledTimes);
    } else {
      setHoveredTimes(null); // Reset when hover is removed
    }
  };

  const handleAutocompleteClick = () => {
    if (hoveredTimes) {
      setTimes(hoveredTimes); // Save the hovered state permanently
      setIsAutocompleteUsed(true);
    }
  };

  const handleResetClick = () => {
    handleReset();
    setIsAutocompleteUsed(false);
  };

  return (
    <div className={styles.container}>
      <Button
        disabled={!hasAtLeastOneTime}
        onClick={handleResetClick}
        variant="secondary"
      >
        Reset
      </Button>
      <Button
        disabled={!hasAtLeastOneTime || isAutocompleteUsed}
        onMouseEnter={() => handleAutocompleteHover(true)} // Apply template on hover
        onMouseLeave={() => handleAutocompleteHover(false)} // Remove template on hover leave
        onClick={handleAutocompleteClick} // Save permanently on click
      >
        Autocomplete
      </Button>
      <Button variant="secondary" disabled={!allDaysHaveTime}>
        Upload
      </Button>
    </div>
  );
};

export default Actions;
