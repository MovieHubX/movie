import React, { Fragment, memo, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Heading, SimpleGrid, Button, Stack } from "@chakra-ui/react";
import { ArrowForwardIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ButtonBg from "../Buttons/ButtonBg";
import Film from "../Film/Film";
import { useSelector } from "react-redux";
import { getConfigSelector } from "../../redux/selector";

const SectionTrending = ({ data = [], name, trendingInWeek, setTrendingInWeek }) => {
  const { config } = useSelector(getConfigSelector);
  const [swiper, setSwiper] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleNext = () => {
    if (swiper !== null && progress < data.length - 1) {
      swiper.slideNext();
      setProgress((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (swiper !== null && progress > 0) {
      swiper.slidePrev();
      setProgress((prev) => prev - 1);
    }
  };

  const handleSlideChange = (swiper) => {
    setProgress(swiper.activeIndex);
  };

  return (
    <Box mb="50px" position="relative">
      <Flex
        mb="30px"
        justify="space-between"
        align="center"
        wrap="wrap" // Allows items to wrap as needed on smaller screens
      >
        {/* heading */}
        <Heading
          textTransform="capitalize"
          fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
          flex="1" // Ensure heading takes up space flexibly
          minWidth="120px" // Minimum width to prevent overly squeezing on small screens
        >
          {data?.homeSectionName || name}
        </Heading>
        {/* switcher */}
        <Stack
          direction="row"
          spacing="4"
          align="center"
          flex="1" // Allows the switcher stack to flexibly take up space
          justify="center" // Center content within the stack for all screen sizes
          minWidth="150px" // Minimum width to ensure layout consistency
        >
          <Button
            size="sm"
            onClick={() => setTrendingInWeek((prev) => !prev)}
            variant={trendingInWeek ? "solid" : "outline"}
            colorScheme={trendingInWeek ? "blue" : "gray"}
          >
            {trendingInWeek ? "Weekly" : "Daily"} Trending
          </Button>
        </Stack>
        {/* more button */}
        <Link to={`/trending/${trendingInWeek ? "week" : "day"}`}>
          <ButtonBg minWidth="100px" // Ensures "More" button has a consistent size
          >
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
