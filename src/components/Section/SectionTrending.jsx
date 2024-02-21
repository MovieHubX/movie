import React, { Fragment, memo, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Heading, SimpleGrid, Button, useBreakpointValue } from "@chakra-ui/react";
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

  const alignSwitcherRight = useBreakpointValue({ base: true, md: false });

  return (
    <Box mb="50px" position="relative">
      <Flex direction="column" align="center" mb="30px">
        <Heading
          textTransform="capitalize"
          fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
          mb={{ base: 4, md: 5 }}
        >
          {data?.homeSectionName || name}
        </Heading>
        <Flex width="full" justify={{ base: "space-between", md: "center" }} align="center">
          {alignSwitcherRight ? (
            <Box flex="1"></Box> // Empty box to push the switcher and More button to the right on mobile
          ) : null}
          <Button
            size="sm"
            onClick={() => setTrendingInWeek(prev => !prev)}
            variant={trendingInWeek ? "solid" : "outline"}
            colorScheme="blue"
            mr={{ base: 0, md: 4 }}
          >
            {trendingInWeek ? "This Week" : "Today"}
          </Button>
          <Link to={`/trending/${trendingInWeek ? "week" : "day"}`}>
            <ButtonBg>
              More
              <ArrowForwardIcon ml={2} />
            </ButtonBg>
          </Link>
          {alignSwitcherRight ? (
            <Box flex="1"></Box> // Dummy box to balance the space on mobile, if needed
          ) : null}
        </Flex>
      </Flex>

      {/* Swiper and other components remain the same */}
    </Box>
  );
};

export default memo(SectionTrending);
