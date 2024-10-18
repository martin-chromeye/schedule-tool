import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { addClass } from "../../utils/addClass";
import { Swiper as SwiperType } from "swiper";
import { Icon } from "../Icon";

import styles from "./Carousel.module.scss";

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

  const handleNext = () => {
    if (isNextDisabled) return;

    const newStartIndex = startIndex + 7; // Move by 7 for the next week
    if (newStartIndex < slides) {
      setStartIndex(newStartIndex);
      swiperInstance?.slideTo(newStartIndex); // Move to the new index
    } else {
      const lastIndex = Math.max(0, slides - 7); // Last available index
      setStartIndex(lastIndex);
      swiperInstance?.slideTo(lastIndex); // Move to the last available slides
    }
  };

  const handlePrev = () => {
    if (isPrevDisabled) return; // Prevent action if disabled

    let newStartIndex = 0;

    if (isNextDisabled) {
      newStartIndex = slides - 7 - 7; // Solution to workaroung starting index
    } else {
      newStartIndex = Math.max(startIndex - 7, 0); // Always move back 7 slides unless we go below 0
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

    if (endDate) {
      const newSlides = Math.max(
        0,
        (endDate.getTime() - (startDate ? startDate.getTime() : 0)) /
          (1000 * 60 * 60 * 24) +
          1
      );
      if (newSlides > slides) {
        setIsNextDisabled(false);
      }
    }
  }, [startDate, endDate, swiperInstance, slides]);

  useEffect(() => {
    setIsPrevDisabled(startIndex === 0);
    setIsNextDisabled(startIndex + 7 >= slides);
  }, [startIndex, slides]);

  return (
    <section className={styles.container}>
      {slides > 7 ? (
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
      ) : null}
      <Swiper
        modules={[Navigation]}
        onSwiper={setSwiperInstance}
        allowTouchMove={false}
        navigation={{
          nextEl: ".js-swiper-button-next",
          prevEl: ".js-swiper-button-prev",
        }}
        spaceBetween={50}
        slidesPerView={Math.min(slides, 7)}
        className="carousel js-carousel"
      >
        {Array.from({ length: slides }).map((_, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <div className="empty-slide-content">
              <span>Day {index + 1}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Carousel;
