import { Box, Flex, Heading } from '@chakra-ui/react';
import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListFilmLayout from 'src/components/Layout/ListFilmLayout'

import { getMovieSelector } from 'src/redux/selector';
import { fetchMoviesData } from 'src/services';

const HeadingLookup = {
  popular: 'Popular Movies',
  'now_playing': 'Now Playing Movies',
  upcoming: 'Upcoming Movies',
  'top_rated': 'Top Rated Movies'
};

export const Movie = ({ type = 'popular' }) => {
  const dispatch = useDispatch();
  let pageCount = useRef(0);
  const { value, status, page } = useSelector(getMovieSelector);
  
  const handleDispatchAction = useCallback(() => {
    dispatch(
      fetchMoviesData({
        path: `movie/${type}`,
        params: { page: ++pageCount.current },
      })
    );
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
            base: "xl",
            md: "2xl",
            lg: "3xl",
          }}
        >
          {HeadingLookup[type]}
        </Heading>
      </Flex>
      {/* Replace ListFilmInfinity with ListFilmLayout */}
      <ListFilmLayout listFilm={value || []} />
    </Box>
  )
};
