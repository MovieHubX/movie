import React, { Fragment, memo, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { ArrowForwardIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper";
import "swiper/css";
import { motion } from "framer-motion";
import ButtonBg from "../Buttons/ButtonBg";
import Film from "../Film/Film";
import { getConfigSelector } from "../../redux/selector";
import { useSelector } from "react-redux";

const SectionTrending = ({ data = [], name }) => {
  const { config } = useSelector(getConfigSelector);
  const [swiper, setSwiper] = useState(null);
  const [progress, setProgress] = useState(0);
  const [trendingInWeek, setTrendingInWeek] = useState(true); // Added state for toggling day/week trending

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
              {name}
            </Heading>
          </Box>
          {/* Change time period */}
          <Flex align="center">
            <Box
              mr={4}
              cursor="pointer"
              onClick={() => setTrendingInWeek(true)}
              color={trendingInWeek ? "blue.500" : "gray.500"}
            >
              Week
            </Box>
            <Box
              cursor="pointer"
              onClick={() => setTrendingInWeek(false)}
              color={!trendingInWeek ? "blue.500" : "gray.500"}
            >
              Day
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

      {/* Progress bar container */}
      <Box mb="20px">
        <Box display="flex" bg="#fff" borderRadius="2px">
          {data.map((_, index) => (
            <Box
              key={index}
              bg={index <= progress ? "primaryColor" : "transparent"}
              h="4px"
              flex="1"
              mx="-1px" // Adjusted margin to remove white space between dots
              borderRadius="0" // Removed border radius to make it seamless
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
        <SimpleGrid columns={[1, 2, 4]} spacing={6}>
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
        </SimpleGrid>
      </Swiper>

      {/* Arrow buttons */}
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
