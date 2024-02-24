import React, { Fragment, memo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Film from "../Film/Film";
import ButtonBg from "../Buttons/ButtonBg";
import { getConfigSelector, getMovieSelector } from "../../redux/selector";
import { useSelector, useDispatch } from "react-redux";
import { fetchMoviesData } from "../src/services";

const HeadingLookup = {
  popular: "Popular Movies",
  now_playing: "Now Playing Movies",
  upcoming: "Upcoming Movies",
  top_rated: "Top Rated Movies",
};

const Movie = ({ type = "popular" }) => {
  const dispatch = useDispatch();
  const { config } = useSelector(getConfigSelector);
  const { value, status, page } = useSelector(getMovieSelector);
  const pageCount = useRef(0);

  useEffect(() => {
    pageCount.current = 0;
    dispatch(
      fetchMoviesData({
        path: `movie/${type}`,
        params: { page: 1 },
      })
    );
    window.scrollTo(0, 0);
  }, [dispatch, type]);

  const loadMoreMovies = () => {
    dispatch(
      fetchMoviesData({
        path: `movie/${type}`,
        params: { page: page + 1 },
      })
    );
  };

  return (
    <Box mt="50px">
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
          "@media (max-width: 480px)": {
            gridTemplateColumns: "repeat(3, 1fr)",
          },
        }}
      >
        {value?.map((dataItem, i) => {
          if (i < 18 && Boolean(dataItem.backdrop_path)) {
            return (
              <Box
                key={`${dataItem.id}-${i}`}
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
                  media_type={dataItem.media_type}
                  id={dataItem.id}
                  vote_average={dataItem.vote_average || 0}
                  poster_path={dataItem.poster_path}
                  title={dataItem.title}
                  name={dataItem.name}
                />
              </Box>
            );
          }
          return null;
        })}
      </SimpleGrid>

      {status === "loading" && (
        <Flex justify="center" my="30px">
          <ButtonBg onClick={loadMoreMovies}>Load More</ButtonBg>
        </Flex>
      )}
    </Box>
  );
};

export default memo(Movie);
