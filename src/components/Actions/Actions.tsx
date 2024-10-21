import React, { useState, useEffect } from "react";
import { Button } from "../Button";
import styles from "./Actions.module.scss";
import { isSorted } from "../../utils/isSorted";
import { HintMsg } from "../HintMsg";
import { Modal } from "../Modal";

type Props = {
  times: { [key: string]: string[] };
  setTimes: React.Dispatch<React.SetStateAction<{ [key: string]: string[] }>>;
  dates: Date[];
  allDaysHaveTime: boolean;
  hasAtLeastOneTime: boolean;
  handleReset: () => void;
  handleUpload: () => void;
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
  handleUpload,
}: Props) => {
  const [unsortedDays, setUnsortedDays] = useState<string[]>([]);
  const [uploadDisabled, setUploadDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsorted = Object.entries(times)
      .filter(([_, timesForDay]) => timesForDay.length > 0)
      .filter(([_, timesForDay]) => !isSorted(timesForDay))
      .map(([day]) => {
        const date = new Date(day);
        date.setDate(date.getDate() + 1);

        return date.toLocaleDateString("en-GB").replace(/\//g, ".");
      });

    setUnsortedDays(unsorted);
    setUploadDisabled(unsorted.length > 0);
  }, [times, allDaysHaveTime]);

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

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  const handleCreatePlanClick = () => {
    setIsModalOpen(false);
    handleUpload();
  };

  return (
    <div className={styles.container}>
      {unsortedDays.length > 0 && <HintMsg unsortedDays={unsortedDays} />}
      <div className={styles.wrapper}>
        <Button
          disabled={!hasAtLeastOneTime}
          onClick={handleResetClick}
          variant="secondary"
        >
          Reset
        </Button>
        <Button
          disabled={!hasAtLeastOneTime || isAutocompleteUsed}
          onMouseEnter={() => handleAutocompleteHover(true)}
          onMouseLeave={() => handleAutocompleteHover(false)}
          onClick={handleAutocompleteClick}
        >
          Autocomplete
        </Button>
        <Button
          variant="secondary"
          disabled={!allDaysHaveTime || uploadDisabled}
          onClick={handleUploadClick}
        >
          Upload
        </Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className={styles.modalHeader}>
          Schedule <br /> successfully created.
        </h2>
        <Button customWidth onClick={handleCreatePlanClick}>
          Create another plan
        </Button>
      </Modal>
    </div>
  );
};

export default Actions;
