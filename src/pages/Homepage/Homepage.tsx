import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { MainContainer } from "../../components/MainContainer";
import { Wrapper } from "../../components/Wrapper";
import Datepicker from "../../components/Datepicker/Datepicker";
import { Carousel } from "../../components/Carousel";
import { calculateDayDifference } from "../../utils/calculateDayDifference";

import styles from "./Homepage.module.scss";

type Props = {};

const Homepage = (props: Props) => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const slides = calculateDayDifference(startDate, endDate);

  return (
    <MainContainer>
      <Wrapper>
        <Datepicker
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        {slides ? (
          <Carousel
            slides={slides}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        ) : null}
      </Wrapper>
    </MainContainer>
  );
};

export default Homepage;
