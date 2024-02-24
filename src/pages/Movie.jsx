import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Flex, Heading, Center } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import Film from '../components/Film/Film';
import Loading from '../components/Loading/Loading';

const HeadingLookup = {
  popular: 'Popular Movies',
  now_playing: 'Now Playing Movies',
  upcoming: 'Upcoming Movies',
  top_rated: 'Top Rated Movies',
};

export const Movie = ({ type = 'popular' }) => {
  const dispatch = useDispatch();
  const { config } = useSelector(getConfigSelector);
  const { value: listFilm, status, page } = useSelector(getMovieSelector);
  const [loading, setLoading] = useState(false);
  let pageCount = useRef(0);

  const handleDispatchAction = useCallback(() => {
    setLoading(true);
    dispatch(
      fetchMoviesData({
        path: `movie/${type}`,
        params: { page: ++pageCount.current },
      })
    ).finally(() => setLoading(false));
  }, [dispatch, type]);

  useEffect(() => {
    pageCount.current = 0;
    handleDispatchAction();
    window.scrollTo(0, 0);
  }, [type, handleDispatchAction]);

  const loadMore = () => {
    if (!loading) {
      handleDispatchAction();
    }
  };

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
        {listFilm?.map((item, index) => {
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
      {status === 'loading' && (
        <Center mt="50px">
          <Loading />
        </Center>
      )}
      {status === 'done' && listFilm.length > 0 && (
        <Center mt="50px">
          <button onClick={loadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </Center>
      )}
    </Box>
  );
};
