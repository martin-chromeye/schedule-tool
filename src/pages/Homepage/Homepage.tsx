import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { MainContainer } from "../../components/MainContainer";
import { Wrapper } from "../../components/Wrapper";
import Datepicker from "../../components/Datepicker/Datepicker";

type Props = {};

const Homepage = (props: Props) => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  return (
    <MainContainer>
      <Wrapper>
        <Datepicker
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </Wrapper>
    </MainContainer>
  );
};

export default Homepage;
