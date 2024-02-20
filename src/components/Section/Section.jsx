import React, { Fragment, memo } from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper";
import "swiper/css";

import ButtonBg from "../Buttons/ButtonBg";
import Film from "../Film/Film";
import { getConfigSelector } from "../../redux/selector";
import { useSelector } from "react-redux";

const Section = ({ data = [], name, type, link = '' }) => {
  const { config } = useSelector(getConfigSelector);
  
  // Calculate the number of movies per row
  const moviesPerRow = Math.ceil(data.length / 3);

  return (
    <Box mb="50px">
      <Flex mb="30px" justify="space-between" align="center">
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
        {
          link && (
            <Link to={link}>
              <ButtonBg>
                More
                <ArrowForwardIcon ml={2} />
              </ButtonBg>
            </Link>
          )
        }
      </Flex>

      {[...Array(3)].map((_, rowIndex) => (
        <Swiper
          key={rowIndex}
          slidesPerView={3.2}
          spaceBetween={15}
          breakpoints={{
            768: {
              slidesPerView: 4.3,
            },
            922: {
              slidesPerView: 6.3,
            },
          }}
          keyboard={true}
          modules={[Keyboard]}
        >
          {data.slice(rowIndex * moviesPerRow, (rowIndex + 1) * moviesPerRow).map((movie, i) => (
            <SwiperSlide key={movie.id || i}>
              <Film
                baseUrl={`${config?.images?.base_url}/original/`}
                media_type={type}
                id={movie.id}
                vote_average={movie.vote_average}
                poster_path={movie.poster_path}
                title={movie.title}
                name={movie.name}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ))}
    </Box>
  );
};

export default memo(Section);
