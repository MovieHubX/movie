import React, { Fragment, memo } from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Film from "../Film/Film";
import ButtonBg from "../Buttons/ButtonBg";
import { getConfigSelector } from "../../redux/selector";
import { useSelector } from "react-redux";

const Section = ({ data = [], name, type, link = '' }) => {
  const { config } = useSelector(getConfigSelector);

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

      <SimpleGrid
        columns={{ base: 2, sm: 2, md: 4, lg: 6 }}
        spacing="4"
        sx={{
          '@media (max-width: 480px)': {
            // Override the SimpleGrid columns for screens up to 480px width
            gridTemplateColumns: 'repeat(3, 1fr)',
          },
        }}
      >
        {data?.map((dataItem, i) => {
          if (i < 18) {
            return (
              <Film
                key={dataItem.id}
                baseUrl={`${config?.images?.base_url}/original/`}
                media_type={type}
                id={dataItem.id}
                vote_average={dataItem.vote_average}
                poster_path={dataItem.poster_path}
                title={dataItem.title}
                name={dataItem.name}
              />
            );
          }
          return null;
        })}
      </SimpleGrid>
    </Box>
  );
};

export default memo(Section);

import React, { useCallback, useEffect, useRef } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { getMovieSelector } from 'src/redux/selector';

const HeadingLookup = {
  popular: 'Popular Movies',
  now_playing: 'Now Playing Movies',
  upcoming: 'Upcoming Movies',
  top_rated: 'Top Rated Movies'
};

export const Movie = ({ type = 'popular' }) => {
  const dispatch = useDispatch();
  let pageCount = useRef(0);
  const { data: movies, status, page } = useSelector(getMovieSelector);
  const { config } = useSelector(getConfigSelector);

  const handleDispatchAction = useCallback(() => {
    // Your dispatch action here if required
    // dispatch(fetchMoviesData({ type, page: ++pageCount.current }));
  }, [dispatch, type]);

  useEffect(() => {
    pageCount.current = 0;
    handleDispatchAction();
    window.scrollTo(0, 0);
  }, [type, handleDispatchAction]);

  return (
    <Box mt={'50px'}>
      <Flex mb="30px" justify="space-between" align="center">
        <Heading
          textTransform="capitalize"
          fontSize={{
            base: 'xl',
            md: '2xl',
            lg: '3xl'
          }}>
          {HeadingLookup[type]}
        </Heading>
      </Flex>
      <SimpleGrid
        columns={{ base: 2, sm: 2, md: 4, lg: 6 }}
        spacing="4"
        sx={{
          '@media (max-width: 480px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
          },
        }}>
        {movies?.map((movie, i) => (
          <Film
            key={movie.id}
            baseUrl={`${config?.images?.base_url}/original/`}
            media_type={type}
            id={movie.id}
            vote_average={movie.vote_average}
            poster_path={movie.poster_path}
            title={movie.title}
            name={movie.name}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};
