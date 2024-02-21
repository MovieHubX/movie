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

const SectionTrending = ({ data = [], name, trendingInWeek, setTrendingInWeek }) => {
  const { config } = useSelector(getConfigSelector);
  const [swiper, setSwiper] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
      setProgress(prev => (prev + 1) % data.length);
    }
  };

  const handlePrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();
      setProgress(prev => (prev - 1 + data.length) % data.length);
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
            <motion.div
              initial="week"
              variants={{ week: { left: 0 }, day: { left: "50%" } }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              animate={trendingInWeek ? "week" : "day"}
              style={{ position: "absolute", top: 0, height: "100%", width: "50%", backgroundColor: trendingInWeek ? "#3182ce" : "#63b3ed", borderRadius: "3xl" }}
            >
            </motion.div>
            <Box w={"50%"} onClick={() => setTrendingInWeek(prev => !prev)}>
              <Box color={trendingInWeek ? "#fff" : "#63b3ed"} pos={"relative"} bg="transparent" zIndex={1}>
                This Week
              </Box>
            </Box>

            {/* Today */}
            <Box w={"50%"} onClick={() => setTrendingInWeek(prev => !prev)}>
              <Box pos={"relative"} color={trendingInWeek ? "#63b3ed" : "#fff"} bg="transparent" zIndex={1}>
                Today
              </Box>
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
        <Box display="flex" bg="#fff" borderRadius="2px" overflow="hidden">
          {data.map((_, index) => (
            <Box
              key={index}
              bg={index === progress ? "#3182ce" : "#cbd5e0"}
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
