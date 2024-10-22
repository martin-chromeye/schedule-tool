import React, { useState, useEffect } from "react";
import styles from "./Card.module.scss";
import { addClass } from "../../utils/addClass";
import { Icon } from "../Icon";

type Props = {
  dayOfWeek: string;
  date: string;
  dayTimes: string[];
  setTimes: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string[];
    }>
  >;
  dateKey: string;
  isAutocompleteUsed: boolean;
  hover: boolean;
  isCopy: boolean;
};

const Card = ({
  dayOfWeek,
  date,
  dayTimes,
  setTimes,
  dateKey,
  isAutocompleteUsed,
  hover,
  isCopy,
}: Props) => {
  const [showInput, setShowInput] = useState<{ [key: string]: boolean }>({});
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [tempTime, setTempTime] = useState<string | null>(null);

  useEffect(() => {
    setTimes((prevTimes) => {
      const updatedTimes = { ...prevTimes };
      if (!updatedTimes[dateKey]) {
        updatedTimes[dateKey] = [];
      }
      return updatedTimes;
    });
  }, [dateKey, setTimes]);

  const handleTimeChange = (dateKey: string, time: string) => {
    setTimes((prevTimes) => {
      const updatedTimes = prevTimes[dateKey]
        ? [...prevTimes[dateKey], time]
        : [time];
      return {
        ...prevTimes,
        [dateKey]: updatedTimes,
      };
    });
    setTempTime(null);
    setShowInput((prev) => ({ ...prev, [dateKey]: false }));
  };

  const handleRemoveTime = (dateKey: string, time: string) => {
    setTimes((prevTimes) => ({
      ...prevTimes,
      [dateKey]: prevTimes[dateKey]?.filter((t) => t !== time) || [],
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempTime(e.target.value);
  };

  const toggleInput = (dateKey: string) => {
    setShowInput((prev) => ({ ...prev, [dateKey]: !prev[dateKey] }));
    if (!showInput[dateKey]) {
      setTempTime(null);
    }
  };

  const handleBlur = (dateKey: string) => {
    if (tempTime) {
      handleTimeChange(dateKey, tempTime);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tempTime) {
      handleTimeChange(dateKey, tempTime);
      setShowInput((prev) => ({ ...prev, [dateKey]: false }));
      setTempTime(null);
      toggleInput(dateKey);
    }
  };

  return (
    <div className={addClass(styles.card, hover ? styles.hover : "")}>
      <div className={styles.header}>
        <h3 className={addClass(styles.heading, styles.headingPrimary)}>
          {dayOfWeek}
        </h3>
        <p className={addClass(styles.heading, styles.headingSecondary)}>
          {date}
        </p>
      </div>
      <div
        className={addClass(
          styles.cardWrapper,
          isAutocompleteUsed ? styles.isAutocompleteUsed : ""
        )}
        onMouseEnter={() => setHoveredCard(dateKey)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        {dayTimes.length > 0 && (
          <div className={styles.timesWrapper}>
            {dayTimes.map((time, i) => (
              <div
                className={addClass(
                  styles.addedTime,
                  isAutocompleteUsed ? styles.isAutocompleteUsed : "",
                  isCopy ? styles.isCopy : ""
                )}
                key={i}
              >
                <span>{time}</span>
                <button
                  className={styles.removeCta}
                  onClick={() => handleRemoveTime(dateKey, time)}
                >
                  <Icon className={styles.cancelIcon} name="cancel-icon" />
                </button>
              </div>
            ))}
          </div>
        )}
        {showInput[dateKey] ? (
          <>
            <input
              type="time"
              className={styles.input}
              value={tempTime || ""}
              onChange={handleInputChange}
              onBlur={() => handleBlur(dateKey)}
              onKeyDown={handleKeyDown}
            />
          </>
        ) : (
          hoveredCard === dateKey && (
            <button
              className={styles.addCta}
              onClick={() => toggleInput(dateKey)}
            >
              Add time
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Card;
