import React from "react";
import DatePicker from "react-datepicker";

import styles from "./Datepicker.module.scss";
import { addClass } from "../../utils/addClass";
import { calculateDayDifference } from "../../utils/calculateDayDifference";

type Props = {
  startDate: Date | undefined;
  setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  endDate: Date | undefined;
  setEndDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

const Datepicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: Props) => {
  const dayDifference = calculateDayDifference(startDate, endDate);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <p className={styles.label}>Start-Date</p>
        <DatePicker
          selected={startDate}
          id="start-date"
          className={styles.datepicker}
          onChange={(date: Date | null) => setStartDate(date || undefined)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText=""
          dateFormat="dd.MM.yyyy"
          isClearable={startDate ? true : false}
          maxDate={endDate} // Restrict start date to be before or on the end date
        />
      </div>
      <div className={styles.wrapper}>
        <p className={styles.label}>End-Date</p>
        <DatePicker
          selected={endDate}
          id="end-date"
          className={styles.datepicker}
          onChange={(date: Date | null) => setEndDate(date || undefined)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate} // Restrict end date to be after or on the start date
          placeholderText=""
          dateFormat="dd.MM.yyyy"
          isClearable={endDate ? true : false}
        />
      </div>
      {dayDifference !== null && (
        <p
          className={addClass(styles.label, styles.labelSecondary)}
        >{`${dayDifference} ${dayDifference === 1 ? "day" : "days"}`}</p>
      )}
    </div>
  );
};

export default Datepicker;
