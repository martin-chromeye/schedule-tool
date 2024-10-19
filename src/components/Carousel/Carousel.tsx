import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { addClass } from "../../utils/addClass";
import { Swiper as SwiperType } from "swiper";
import { Icon } from "../Icon";
import styles from "./Carousel.module.scss";
import { Card } from "../Card";

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

  // State to store times for each day
  const [times, setTimes] = useState<{ [key: string]: string[] }>({});

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
    // Reset swiper and startIndex when startDate or endDate changes
    setStartIndex(0);
    swiperInstance?.slideTo(0);

    // Update the disabled state based on current startIndex and slides
    setIsPrevDisabled(true);
    setIsNextDisabled(slides <= 7);
  }, [startDate, endDate, swiperInstance, slides]);

  useEffect(() => {
    setIsPrevDisabled(startIndex === 0);
    setIsNextDisabled(startIndex + 7 >= slides);
  }, [startIndex, slides]);

  // Generate an array of dates between startDate and endDate
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
        modules={[Navigation]}
        onSwiper={setSwiperInstance}
        allowTouchMove={false}
        navigation={{
          nextEl: ".js-swiper-button-next",
          prevEl: ".js-swiper-button-prev",
        }}
        spaceBetween={12}
        slidesPerView={Math.min(slides, 7)}
        className="carousel js-carousel"
      >
        {dates.map((date, index) => {
          const dateKey = date.toISOString().split("T")[0]; // Key for storing time
          const formattedDate = date
            .toLocaleDateString("en-GB")
            .replace(/\//g, ".");
          const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
          const dayTimes = times[dateKey] || [];

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
    </section>
  );
};

export default Carousel;
