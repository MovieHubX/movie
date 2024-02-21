import React, { Fragment, memo, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Heading, SimpleGrid, Button, Stack, Spacer } from "@chakra-ui/react";
import { ArrowForwardIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper";
import "swiper/css";
import ButtonBg from "../Buttons/ButtonBg";
import Film from "../Film/Film";
import { getConfigSelector } from "../../redux/selector";
import { useSelector } from "react-redux";

const SectionTrending = ({ data = [], name, trendingInWeek, setTrendingInWeek }) => {
  const { config } = useSelector(getConfigSelector);
  const [swiper, setSwiper] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleNext = () => {
    if (swiper !== null && progress < data.length - 1) {
      swiper.slideNext();
      setProgress(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (swiper !== null && progress > 0) {
      swiper.slidePrev();
      setProgress(prev => prev - 1);
    }
  };

  const handleSlideChange = (swiper) => {
    setProgress(swiper.activeIndex);
  };

  return (
    <Box mb="50px" position="relative">
      <Flex mb="30px" justify="space-between" align="center" direction={{ base: "column", md: "row" }}>
        <Heading
          textTransform="capitalize"
          fontSize={{
            base: "xl",
            md: "2xl",
            lg: "3xl",
          }}
          mb={{ base: 4, md: 0 }} // Add margin-bottom on mobile only to separate title and switch
        >
          {data?.homeSectionName || name}
        </Heading>
        {/* Centering the switch on all screen sizes */}
        <Flex justify="center" align="center" w="full">
          <Spacer />
          <Button
            size="sm"
            onClick={() => setTrendingInWeek(prev => !prev)}
            variant={trendingInWeek ? "solid" : "outline"}
            colorScheme={trendingInWeek ? "blue" : "gray"}
            isFullWidth={false} // Ensure button does not stretch
          >
            {trendingInWeek ? "This Week" : "Today"}
          </Button>
          <Spacer />
          <Link to={`/trending/${trendingInWeek ? "week" : "day"}`} display={{ base: "none", md: "inline-flex" }}>
            <ButtonBg>
              More
              <ArrowForwardIcon ml={2} />
            </ButtonBg>
          </Link>
        </Flex>
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
