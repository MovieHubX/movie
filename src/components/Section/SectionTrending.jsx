import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { ArrowForwardIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useSprings, animated } from "react-spring";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper";
import "swiper/css";
import ButtonBg from "../Buttons/ButtonBg";
import Film from "../Film/Film";
import { getConfigSelector } from "../../redux/selector";
import { useSelector } from "react-redux";

const SectionTrending = ({ data = [], name, trendingInWeek, setTrendingInWeek }) => {
  const { config } = useSelector(getConfigSelector);
  const [progress, setProgress] = useState(0);

  const handleNext = () => {
    if (progress < data.length - 1) {
      setProgress(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (progress > 0) {
      setProgress(prev => prev - 1);
    }
  };

  const progressSprings = useSprings(
    data.length,
    data.map((_, index) => ({
      width: `${(index <= progress ? 1 : 0) * 100}%`,
    }))
  );

  return (
    <Box mb="50px" position="relative">
      <Flex mb="30px" justify="space-between" align="center">
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
          {/* This Week */}
          <Box
            w={"50%"}
            onClick={() => setTrendingInWeek(prev => !prev)}
            color={trendingInWeek ? "#fff" : "#63b3ed"}
            pos={"relative"}
            bg="transparent"
            zIndex={1}
          >
            This Week
          </Box>
          {/* Today */}
          <Box
            w={"50%"}
            onClick={() => setTrendingInWeek(prev => !prev)}
            color={trendingInWeek ? "#63b3ed" : "#fff"}
            pos={"relative"}
            bg="transparent"
            zIndex={1}
          >
            Today
          </Box>
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
        <Box display="flex" bg="#fff" borderRadius="2px" overflow="hidden">
          {progressSprings.map((style, index) => (
            <animated.div
              key={index}
              style={{
                ...style,
                height: "4px",
                flex: 1,
                mx: "-1px",
                borderRadius: 0,
                backgroundColor: "#3182ce",
              }}
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
        onSlideChange={(swiper) => setProgress(swiper.activeIndex)}
      >
        <Box position="relative">
          <SwiperSlide>
            <SimpleGrid columns={[1, 2, 4]} spacing={6}>
              {data.map((data, i) => {
                if (i < 18) {
                  return (
                    <Film
                      key={data.id}
                      baseUrl={`${config?.images?.base_url}/original/`}
                      media_type={data.media_type}
                      id={data.id}
                      vote_average={data.vote_average}
                      poster_path={data.poster_path}
                      title={data.title}
                      name={data.name}
                    />
                  );
                }
                return null;
              })}
            </SimpleGrid>
          </SwiperSlide>
          {/* Arrow buttons */}
          <Box position="absolute" top="50%" left="0" zIndex={1} onClick={handlePrev}>
            <ChevronLeftIcon boxSize={12} color="blue.500" cursor="pointer" />
          </Box>
          <Box position="absolute" top="50%" right="0" zIndex={1} onClick={handleNext}>
            <ChevronRightIcon boxSize={12} color="blue.500" cursor="pointer" />
          </Box>
        </Box>
      </Swiper>
    </Box>
  );
};

export default memo(SectionTrending);
