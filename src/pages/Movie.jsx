import React, { useCallback, useEffect, useRef } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { getMovieSelector, getConfigSelector } from 'src/redux/selector'; // Assuming the correct path to the selectors
import Film from '../Film/Film';

const HeadingLookup = {
  popular: 'Popular Movies',
  now_playing: 'Now Playing Movies',
  upcoming: 'Upcoming Movies',
  top_rated: 'Top Rated Movies',
};

export const Movie = ({ type = 'popular' }) => {
  const dispatch = useDispatch();
  let pageCount = useRef(0);
  const { value, status, page } = useSelector(getMovieSelector);
  const config = useSelector(getConfigSelector); // Fetching config directly from Redux state

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
            base: 'xl',
            md: '2xl',
            lg: '3xl',
          }}
        >
          {HeadingLookup[type]}
        </Heading>
      </Flex>
      <Flex
        mt="50px"
        display="flex"
        alignItems="flex-start"
        justifyContent={'center'}
        flexWrap="wrap"
        overflow="hidden"
      >
        {value?.map((item, index) => {
          if (Boolean(item.backdrop_path)) {
            return (
              <Box
                key={`${item.id}-${index}`}
                w={{
                  base: 'calc(33.334% - 10px)',
                  md: 'calc(25% - 15px)',
                  lg: 'calc(16.667% - 15px)',
                }}
                mb="50px"
                mx={{
                  base: '5px',
                  md: '7.5px',
                }}
              >
                <Film
                  baseUrl={`${config?.images?.base_url}/original/`}
                  media_type={item.media_type}
                  id={item.id}
                  vote_average={item.vote_average || 0}
                  poster_path={item.poster_path}
                  title={item.title}
                  name={item.name}
                />
              </Box>
            );
          }
          return null;
        })}
      </Flex>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'error' && <p>Error fetching data.</p>}
    </Box>
  );
};
