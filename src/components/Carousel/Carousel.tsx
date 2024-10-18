import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Icon } from "../Icon";

import styles from "./Carousel.module.scss";

type Props = {
  slides: number;
  startDate: Date | undefined;
  endDate: Date | undefined;
};

const Carousel = ({ slides, startDate, endDate }: Props) => {
  return (
    <section className={styles.container}>
      <div className={styles.carouselActions}>
        <Icon
          className={`${styles.carouselBtn} js-swiper-button-prev`}
          name="arrow-left"
        />
        <Icon
          className={`${styles.carouselBtn} js-swiper-button-next`}
          name="arrow-right"
        />
      </div>
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".js-swiper-button-next",
          prevEl: ".js-swiper-button-prev",
        }}
        spaceBetween={50}
        slidesPerView={1}
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
