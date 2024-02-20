import React, { Fragment, memo, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { ArrowForwardIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"; // Added arrow icons
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper";
import "swiper/css";
import { motion } from "framer-motion";

import ButtonBg from "../Buttons/ButtonBg";
import Film from "../Film/Film";
import { getConfigSelector } from "../../redux/selector";
import { useSelector } from "react-redux";

const SectionTrending = ({ data = [], name, trendingInWeek, setTrendingInWeek }) => {
  const { config } = useSelector(getConfigSelector);
  const [swiper, setSwiper] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
      setProgress(progress + 1);
    }
  };

  const handlePrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();
      setProgress(progress - 1);
    }
  };

  const handleSlideChange = (swiper) => {
    setProgress(swiper.activeIndex);
  };

  return (
    <Box mb="50px" position="relative">
      <Flex mb="30px" justify="space-between" align="center">
        <Flex justify={"center"} align="center" columnGap={"8"}>
          {/* heading */}
          <Box>
            <Heading
              textTransform="capitalize"
              fontSize={{
                base: "xl",
                md: "2xl",
                lg: "3xl",
              }}
            >
              {data?.homeSectionName || name}
            </Heading>
          </Box>
        </Flex>
        <Link to={`/trending/${trendingInWeek ? "week" : "day"}`}>
          <ButtonBg>
            More
            <ArrowForwardIcon ml={2} />
          </ButtonBg>
        </Link>
      </Flex>

      {/* Progress bar container with border */}
      <Box border="1px solid #E2E8F0" borderRadius="2px" p="2px">
        <Box display="flex" bg="#fff">
          {data.map((_, index) => (
            <Box
              key={index}
              bg={index <= progress ? "primaryColor" : "transparent"}
              h="4px"
              flex="1"
              mx="1px"
              borderRadius="2px"
            />
          ))}
        </Box>
      </Box>

      <Swiper
        slidesPerView={2}
        spaceBetween={15}
        breakpoints={{
          768: {
            slidesPerView: 4,
          },
        }}
        keyboard={true}
        modules={[Keyboard]}
        onSwiper={setSwiper}
        onSlideChange={handleSlideChange}
      >
        {data?.map((data, i) => {
          if (i < 18) {
            return (
              <SwiperSlide key={data.id}>
                <Film
                  baseUrl={`${config?.images?.base_url}/original/`}
                  media_type={data.media_type}
                  id={data.id}
                  vote_average={data.vote_average}
                  poster_path={data.poster_path}
                  title={data.title}
                  name={data.name}
                />
              </SwiperSlide>
            );
          }
          return <Fragment key={data.id || i}></Fragment>;
        })}
      </Swiper>

      {/* Arrow thingys */}
      <Box position="absolute" top="50%" transform="translateY(-50%)" left="0" zIndex={1}>
        <ChevronLeftIcon boxSize={12} color="blue.500" cursor="pointer" onClick={handlePrev} />
      </Box>
      <Box position="absolute" top="50%" transform="translateY(-50%)" right="0" zIndex={1}>
        <ChevronRightIcon boxSize={12} color="blue.500" cursor="pointer" onClick={handleNext} />
      </Box>
    </Box>
  );
};

export default memo(SectionTrending);
