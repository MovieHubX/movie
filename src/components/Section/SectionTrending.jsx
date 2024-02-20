import React, { Fragment, memo, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { ArrowForwardIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"; // Added arrow icons
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination } from "swiper";
import "swiper/css";
import { motion } from "framer-motion";

import ButtonBg from "../Buttons/ButtonBg";
import Film from "../Film/Film";
import { getConfigSelector } from "../../redux/selector";
import { useSelector } from "react-redux";

const SectionTrending = ({ data = [], name, trendingInWeek, setTrendingInWeek }) => {
  const { config } = useSelector(getConfigSelector);
  const [swiper, setSwiper] = useState(null);

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

  const variants = {
    week: { left: 0 },
    day: { left: "50%" },
  };
  const spring = {
    type: "spring",
    stiffness: 300,
    damping: 30,
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
            <motion.div
              initial="week"
              variants={variants}
              transition={spring}
              animate={trendingInWeek ? "week" : "day"}
              style={{ position: "absolute", top: 0, height: "100%", width: "50%" }}
            >
              <Box rounded="3xl" w="full" h="full" bg={"primaryColor"} zIndex="0"></Box>
            </motion.div>
            {/* This Week */}
            <Box w={"50%"} onClick={() => setTrendingInWeek((prev) => !prev)}>
              <Box color={trendingInWeek ? "#fff" : "primaryColor"} pos={"relative"} bg="transparent" zIndex={1}>
                This Week
              </Box>
            </Box>

            {/* Today */}
            <Box w={"50%"} onClick={() => setTrendingInWeek((prev) => !prev)}>
              <Box pos={"relative"} color={trendingInWeek ? "primaryColor" : "#fff"} bg="transparent" zIndex={1}>
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

      <Swiper
        slidesPerView={1}
        spaceBetween={15}
        breakpoints={{
          768: {
            slidesPerView: 4,
          },
        }}
        keyboard={true}
        modules={[Keyboard, Pagination]}
        onSwiper={setSwiper}
        pagination={{ clickable: true }}
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
        <ChevronLeftIcon boxSize={10} color="blue.500" cursor="pointer" onClick={handlePrev} />
      </Box>
      <Box position="absolute" top="50%" transform="translateY(-50%)" right="0" zIndex={1}>
        <ChevronRightIcon boxSize={10} color="blue.500" cursor="pointer" onClick={handleNext} />
      </Box>
    </Box>
  );
};

export default memo(SectionTrending);
