import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Scrollbar, FreeMode, Mousewheel } from "swiper/modules";
import { addClass } from "../../utils/addClass";
import { Swiper as SwiperType } from "swiper";
import { Icon } from "../Icon";
import styles from "./Carousel.module.scss";
import { Card } from "../Card";
import Actions from "../Actions/Actions";

type Props = {
  slides: number;
  startDate: Date | undefined;
  endDate: Date | undefined;
};

const Carousel = ({ slides, startDate, endDate }: Props) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [isPrevDisabled, setIsPrevDisabled] = useState<boolean>(true);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(false);
  const [allDaysHaveTime, setAllDaysHaveTime] = useState<boolean>(false);
  const [hasAtLeastOneTime, setHasAtLeastOneTime] = useState<boolean>(false);
  const [times, setTimes] = useState<{ [key: string]: string[] }>({});
  console.log("times: ", times);
  const [hoveredTimes, setHoveredTimes] = useState<{
    [key: string]: string[];
  } | null>(null);
  const [isAutocompleteUsed, setIsAutocompleteUsed] = useState<boolean>(false);

  const handleReset = () => {
    setTimes((prevTimes) => {
      const updatedTimes = { ...prevTimes };
      for (const key in updatedTimes) {
        updatedTimes[key] = [];
      }
      return updatedTimes;
    });
  };

  const handleNext = () => {
    if (isNextDisabled) return;
    const newStartIndex = startIndex + 7; // Move by 7 for the next week
    if (newStartIndex < slides) {
      setStartIndex(newStartIndex);
      swiperInstance?.slideTo(newStartIndex);
    } else {
      const lastIndex = Math.max(0, slides - 7);
      setStartIndex(lastIndex);
      swiperInstance?.slideTo(lastIndex);
    }
  };

  const handlePrev = () => {
    if (isPrevDisabled) return;

    let newStartIndex = 0;

    if (isNextDisabled) {
      newStartIndex = slides - 14; // 14 because slided are moves -7 and -7 to start from index on prev options
    } else {
      newStartIndex = Math.max(startIndex - 7, 0);
    }
    setStartIndex(newStartIndex);
    swiperInstance?.slideTo(newStartIndex);
  };

  useEffect(() => {
    setStartIndex(0);
    swiperInstance?.slideTo(0);
    setIsPrevDisabled(true);
    setIsNextDisabled(slides <= 7);
  }, [startDate, endDate, slides, swiperInstance]); // Removed swiperInstance dependency

  useEffect(() => {
    setIsPrevDisabled(startIndex === 0);
    setIsNextDisabled(startIndex + 7 >= slides);
  }, [startIndex, slides]);

  const dateArray = () => {
    if (!startDate || !endDate) return [];
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const dates = dateArray();

  useEffect(() => {
    const dateKeysInRange = dates.map(
      (date) => date.toISOString().split("T")[0]
    );

    setTimes((prevTimes) => {
      const newTimes = { ...prevTimes };
      let isChanged = false;

      Object.keys(newTimes).forEach((key) => {
        if (!dateKeysInRange.includes(key)) {
          delete newTimes[key];
          isChanged = true;
        }
      });

      return isChanged ? newTimes : prevTimes;
    });
  }, [startDate, endDate, dates]);

  useEffect(() => {
    const allHaveTimes = dates.every((date) => {
      const dateKey = date.toISOString().split("T")[0];
      return times[dateKey] && times[dateKey].length > 0;
    });
    setAllDaysHaveTime(allHaveTimes);
  }, [times, dates]);

  useEffect(() => {
    const hasAnyTime = Object.values(times).some(
      (dayTimes) => dayTimes.length > 0
    );
    setHasAtLeastOneTime(hasAnyTime);
  }, [times]);

  return (
    <section className={styles.container}>
      {slides > 7 && (
        <div className={styles.carouselActions}>
          <Icon
            className={`${addClass(
              styles.carouselBtn,
              isPrevDisabled ? styles.disabled : ""
            )} js-swiper-button-prev`}
            name="arrow-left"
            onClick={handlePrev}
          />
          <Icon
            className={`${addClass(
              styles.carouselBtn,
              isNextDisabled ? styles.disabled : ""
            )} js-swiper-button-next`}
            name="arrow-right"
            onClick={handleNext}
          />
        </div>
      )}
      <Swiper
        className={styles.swiper}
        modules={[Navigation, Scrollbar, FreeMode, Mousewheel]}
        onSwiper={setSwiperInstance}
        freeMode={true}
        centeredSlidesBounds={true}
        scrollbar={{
          hide: false,
          draggable: true,
        }}
        mousewheel={true}
        navigation={{
          nextEl: ".js-swiper-button-next",
          prevEl: ".js-swiper-button-prev",
        }}
        spaceBetween={12}
        slidesPerView={Math.min(slides, 7)}
      >
        {dates.map((date, index) => {
          const dateKey = date.toISOString().split("T")[0];
          const formattedDate = date
            .toLocaleDateString("en-GB")
            .replace(/\//g, ".");
          const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
          const dayTimes =
            (hoveredTimes && hoveredTimes[dateKey]) || times[dateKey] || [];

          return (
            <SwiperSlide key={index}>
              <Card
                dayOfWeek={dayOfWeek}
                date={formattedDate}
                dayTimes={dayTimes}
                setTimes={setTimes}
                dateKey={dateKey}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Actions
        allDaysHaveTime={allDaysHaveTime}
        hasAtLeastOneTime={hasAtLeastOneTime}
        handleReset={handleReset}
        times={times} // Pass times to Actions
        setTimes={setTimes} // Pass setTimes to Actions
        dates={dates} // Pass the date array to Actions
        setHoveredTimes={setHoveredTimes}
        hoveredTimes={hoveredTimes}
        setIsAutocompleteUsed={setIsAutocompleteUsed}
        isAutocompleteUsed={isAutocompleteUsed}
      />
    </section>
  );
};

export default Carousel;
