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
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  };

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
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
          {/* change time */}
          <Flex
            overflow={"hidden"}
            display={{ base: "none", md: "flex" }}
            rounded="3xl"
            border={"rgba(50, 138, 241, 1) 1px solid"}
            justify={"space-between"}
            align="center"
            w={"234px"}
            py="5px"
            fontWeight="bold"
            color="#fff"
            position="relative"
            cursor="pointer"
            textAlign={"center"}
          >
            <Box
              w="50%"
              color={trendingInWeek ? "#fff" : "primaryColor"}
              pos={"relative"}
              bg="transparent"
              zIndex={1}
              onClick={() => setTrendingInWeek((prev) => !prev)}
            >
              This Week
            </Box>
            <Box
              w="50%"
              color={trendingInWeek ? "primaryColor" : "#fff"}
              pos={"relative"}
              bg="transparent"
              zIndex={1}
              onClick={() => setTrendingInWeek((prev) => !prev)}
            >
              Today
            </Box>
          </Flex>
        </Flex>
        <Link to={`/trending/${trendingInWeek ? "week" : "day"}`}>
          <ButtonBg>
            More
            <ArrowForwardIcon ml={2} />
          </ButtonBg>
        </Link>
      </Flex>

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

      {/* Custom pagination */}
      <Box position="absolute" bottom="20px" left="50%" transform="translateX(-50%)" zIndex={1}>
        <Box display="flex">
          {data.map((_, index) => (
            <Box
              key={index}
              bg={index === activeIndex ? "primaryColor" : "transparent"}
              h="4px"
              w="12px"
              mx="2px"
              borderRadius="2px"
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default memo(SectionTrending);
