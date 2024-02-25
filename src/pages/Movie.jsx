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
