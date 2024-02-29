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
import { FaYoutube } from "react-icons/fa"; // Import FaYoutube icon

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
          {/* Movie info */}
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
              </Breadcrumb>

              <Flex align={"center"}>
                {/* Adjusted height for the combined Rating and Star Icon */}
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
                    lineHeight="1.3"
                  >
                    {movieDetail?.vote_average.toFixed(1)}
                  </Text>
                  <StarIcon color="yellow" boxSize="1em" />
                </Box>

                {/* Move Watch Trailer button next to Rating and Star */}
                {trailerKey && (
                  <Box ml="4">
                    <Button
                      onClick={() => {
                        const trailerUrl = `https://www.youtube.com/watch?v=${trailerKey}`;
                        window.open(trailerUrl, "_blank");
                      }}
                      variant="outline"
                      colorScheme="red" // Set colorScheme to red
                      // Add border styling to the button
                      border="1px solid"
                      borderColor="red.500"
                      borderRadius="md"
                      // Add padding to the button
                      px="3"
                    >
                      {/* Replace "Watch" with FaYoutube icon */}
                      <FaYoutube style={{ marginRight: "5px" }} />
                      Watch Trailer
                    </Button>
                  </Box>
                )}
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
            
            {/* Released Date section */}
          <Flex align="center" mb="2">
            <Box mr="10px" color={"textColor"}>
              Released Date:
            </Box>
            <Breadcrumb separator="," spacing="3px">
              <BreadcrumbItem>
                <Text>{movieDetail?.release_date}</Text>
              </BreadcrumbItem>
            </Breadcrumb>
          </Flex>
            
            {/* Genre section */}
            <Flex align="center">
              <Box mr="10px" color={"textColor"}>
                Genre:
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
            </Flex>
            

          </Box>

          {/* Video render */}
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

          {/* Like list */}
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
