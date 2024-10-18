import React, { useState } from "react";

import styles from "./Card.module.scss";

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
};

const Card = ({ dayOfWeek, date, dayTimes, setTimes, dateKey }: Props) => {
  const [showInput, setShowInput] = useState<{ [key: string]: boolean }>({});
  const [tempTime, setTempTime] = useState<string | null>(null); // Temporary state for input

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
    setTempTime(null); // Reset temporary time after saving
    setShowInput((prev) => ({ ...prev, [dateKey]: false })); // Hide input after saving time
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
    setShowInput((prev) => ({
      ...prev,
      [dateKey]: !prev[dateKey],
    }));
    if (!showInput[dateKey]) {
      // If opening input, clear the temporary time
      setTempTime(null);
    }
  };

  const handleBlur = (dateKey: string) => {
    if (tempTime) {
      handleTimeChange(dateKey, tempTime);
    }
  };

  return (
    <div className={styles.card}>
      <h3>{dayOfWeek}</h3>
      <p>{date}</p>
      <div className={styles.cardWrapper}></div>
      {dayTimes.length > 0 && (
        <div>
          {dayTimes.map((time, i) => (
            <div key={i}>
              <span>{time}</span>
              <button onClick={() => handleRemoveTime(dateKey, time)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      {showInput[dateKey] ? (
        <>
          <input
            type="time"
            value={tempTime || ""}
            onChange={handleInputChange}
            onBlur={() => handleBlur(dateKey)} // Save time on blur
          />
        </>
      ) : (
        <button onClick={() => toggleInput(dateKey)}>Add time</button>
      )}
    </div>
  );
};

export default Card;
