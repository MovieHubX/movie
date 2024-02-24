import React, { Fragment, memo, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Film from "../src/components/Film/Film";
import ButtonBg from "../src/components/Buttons/ButtonBg";
import { getConfigSelector, getMovieSelector } from "../src/redux/selector";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../src/components/Loading/Loading";

const HeadingLookup = {
  popular: 'Popular Movies',
  'now_playing': 'Now Playing Movies',
  upcoming: 'Upcoming Movies',
  'top_rated': 'Top Rated Movies'
}

const Movie = ({ type = 'popular' }) => {
  const dispatch = useDispatch();
  const { config } = useSelector(getConfigSelector);
  const { value, status, page } = useSelector(getMovieSelector);
  let pageCount = useRef(0);

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
        {value && value.map((movie, index) => (
          <Box
            key={movie.id}
            w={{
              base: "calc(33.334% - 10px)",
              md: "calc(25% - 15px)",
              lg: "calc(16.667% - 15px)",
            }}
            mb="50px"
            mx={{
              base: "5px",
              md: "7.5px",
            }}
          >
            <Film
              baseUrl={`${config?.images?.base_url}/original/`}
              media_type="movie"
              id={movie.id}
              vote_average={movie.vote_average || 0}
              poster_path={movie.poster_path}
              title={movie.title}
              name={movie.name}
            />
          </Box>
        ))}
      </SimpleGrid>

      {status === "loading" && (
        <Box mt="4" textAlign="center">
          <Loading />
        </Box>
      )}

      {status === "error" && (
        <Box mt="4" textAlign="center">
          Error fetching data.
        </Box>
      )}

      {status === "done" && page < 10 && (
        <Flex justifyContent="center" mt="4">
          <ButtonBg onClick={handleDispatchAction}>
            Load More
            <ArrowForwardIcon ml={2} />
          </ButtonBg>
        </Flex>
      )}
    </Box>
  );
};

export default memo(Movie);
