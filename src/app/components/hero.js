"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import hero from "./assets/hero.webp";
import hero1 from "./assets/hero1.webp";
import hero2 from "./assets/hero2.webp";
import hero3 from "./assets/hero3.webp";
import hero4 from "./assets/hero4.webp";
import heroMob from "./assets/heroMob.webp";
import heroMob1 from "./assets/heroMob1.webp";
import heroMob2 from "./assets/heroMob2.webp";
import heroMob3 from "./assets/heroMob3.webp";

const App = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const desktopHero = [hero.src, hero1.src, hero2.src, hero3.src, hero4.src];
  const mobileHero = [heroMob.src, heroMob1.src, heroMob2.src, heroMob3.src];
  const slides = isMobile ? mobileHero : desktopHero;

  const handleDotClick = (index) => {
    if (swiperInstance) {
      swiperInstance.slideToLoop(index);
    }
  };

  return (
    <div className="w-full h-screen relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="h-full w-full"
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full relative">
              <img
                src={image}
                className="w-full h-full object-cover"
                alt={`Hero Slide ${index + 1}`}
              />
              <div className="absolute top-0 left-0 bg-[#1B1B1B]/40 w-full h-full flex flex-col items-center justify-center text-center">
                <h1 className="text-white text-[58px] leading-[1] md:text-[120px] font-alexBrush md:leading-[150px] mt- md:mt-0">
                  Hikmat & Noah
                </h1>
                <p className="text-white font-normal text-sm md:text-[32px] leading-[1] tracking-[1.6px] md:tracking-[5px] mt-2">
                  23RD AUGUST, 2025
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === index
                ? "w-8 bg-primary"
                : "w-2.5 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
