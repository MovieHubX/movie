/* eslint-disable react-hooks/exhaustive-deps */
import { StarIcon } from "@chakra-ui/icons";
import {
  Box, Breadcrumb,
  BreadcrumbItem,
  Center, Flex, Heading, Text, Button
} from "@chakra-ui/react";
import React, { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import ListFilmLayout from "src/components/Layout/ListFilmLayout";
import Loading from "src/components/Loading/Loading";
import VideoPlayer from "src/components/VideoPlayer/VideoPlayer";

import { movieDetailSelector } from "src/redux/selector";
import { getMovieDetail } from "src/services/movieDetailSlice";

export const MovieDetail = () => {
  const dispatch = useDispatch();
  const player = useRef();
  const params = useParams();
  const { id } = params;

  const { movieDetail, status } = useSelector(movieDetailSelector);

  const handleFindTrailerKey = useCallback(() => {
    const youtubeVideos = movieDetail?.videos?.results?.filter(
      (item) => item?.site === "YouTube"
    );
    const trailer = youtubeVideos?.find(
      (item) => item?.type === "Trailer"
    );
    return trailer?.key || (youtubeVideos?.length > 0 && youtubeVideos[0]?.key);
  }, [movieDetail]);

  const trailerKey = handleFindTrailerKey();

  useEffect(() => {
    dispatch(
      getMovieDetail({
        path: `movie/${id}?append_to_response=videos,images,recommendations,reviews,similar`,
        params,
      })
    );
  }, [id]);

  return (
    <Box mt={"50px"}>
      {status === 'done' ? (
        <Box>
          {/* info  */}
          <Box
            color={"decsColor"}
            _notLast={{
              "&>*": {
                marginBottom: "20px",
              },
            }}
          >
            <Box>
              <Breadcrumb
                separator={"  -  "}
                fontSize={{
                  base: "xl",
                  lg: "2xl",
                }}
                color="textColor"
                fontWeight="bold"
                mb={"10px"}
              >
                <BreadcrumbItem>
                  <Text textTransform="uppercase" letterSpacing="2px">
                    {movieDetail?.title || movieDetail?.name}
                  </Text>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Box>{movieDetail?.release_date}</Box>
                </BreadcrumbItem>
              </Breadcrumb>

              <Flex align={"center"}>
                {/* Enhanced styling for the combined rating and star */}
                <Box
                  display="flex"
                  alignItems="center"
                  border="1px solid"
                  borderColor="primaryColor"
                  p="2"
                  borderRadius="md"
                  mr="4"
                >
                  <Text
                    color="primaryColor"
                    fontWeight="bold"
                    fontSize="18px"
                    pr="2"
                  >
                    {movieDetail?.vote_average.toFixed(1)}
                  </Text>
                  <StarIcon color="yellow" />
                </Box>
              </Flex>
            </Box>

            <Box
              fontSize={{
                base: "sm",
                lg: "lg",
              }}
              fontWeight="medium"
            >
              <Text>{movieDetail?.overview}</Text>
            </Box>

            <Flex align="center">
              {/* Move the Genre and Watch Trailer button in the same Flex container */}
              <Box mr="10px" color={"textColor"}>
                Genre :
              </Box>
              <Breadcrumb separator="," spacing="3px">
                {movieDetail?.genres?.map((item) => {
                  return (
                    <BreadcrumbItem key={item.id}>
                      <Link to={`genres/${item.id}`}>{item.name}</Link>
                    </BreadcrumbItem>
                  );
                })}
              </Breadcrumb>

              {trailerKey && (
                <Box ml="4">
                  <Button
                    onClick={() => {
                      const trailerUrl = `https://www.youtube.com/watch?v=${trailerKey}`;
                      window.open(trailerUrl, "_blank");
                    }}
                    variant="outline"
                    colorScheme="blue"
                    // Add border styling to the button
                    border="1px solid"
                    borderColor="blue.500"
                    borderRadius="md"
                  >
                    Watch Trailer
                  </Button>
                </Box>
              )}
            </Flex>
          </Box>

          {/* video render */}
          <Box
            maxW="100%"
            w="full"
            h={'80vh'}
            overflow="hidden"
            boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
            rounded="5px"
            ref={player}
          >
            <VideoPlayer
              embedSrc={`https://vidsrc.xyz/embed/movie?tmdb=${id}`}
            />
          </Box>

          {/* likeList */}
          {movieDetail?.recommendations?.results?.length > 0 && (
            <Box>
              <Heading fontSize="2xl" mt="50px">
                Similar
              </Heading>
              <ListFilmLayout listFilm={movieDetail?.recommendations?.results} />
            </Box>
          )}

        </Box>
      ) : (
        <Center mt="50px">
          <Loading />
        </Center>
      )}
    </Box>
  );
};
