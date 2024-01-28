
import { Box, Center, Heading, Image, Text, Button } from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import { getConfigSelector, tvDetailSelector } from "../redux/selector";
import { getTvDetail } from "../services";
import { StarIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, Flex, Stack } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import moment from "moment/moment";
import ListFilmLayout from "../components/Layout/ListFilmLayout";
import Loading from "../components/Loading/Loading";

export const TvDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const { tvDetail, status } = useSelector(tvDetailSelector);
  const { config } = useSelector(getConfigSelector);
  const dateFormated = moment(tvDetail?.release_date).format("YYYY");

  const handleFindTrailerKey = useCallback(() => {
    const youtubeVideos = tvDetail?.videos?.results?.filter(
      (item) => item?.site === "YouTube"
    );
    const trailer = youtubeVideos?.find(
      (item) => item?.type === "Trailer"
    );
    return trailer?.key || (youtubeVideos?.length > 0 && youtubeVideos[0]?.key);
  }, [tvDetail]);

  const trailerKey = handleFindTrailerKey();

  useEffect(() => {
    dispatch(
      getTvDetail({
        path: `tv/${id}?append_to_response=videos,recommendations,reviews,similar`,
        params,
      })
    );
  }, [id]);

  return (
    <Box mt={"50px"}>
      {tvDetail?.seasons?.length > 0 && status === "done" ? (
        <Box>
          {/* info */}
          <Box
            color={"decsColor"}
            _notLast={{
              "&>*": {
                marginBottom: "20px",
              },
            }}
          >
            {/* date */}
            <Box>
              <Breadcrumb
                separator={"  -  "}
                fontSize={{
                  base: "2xl",
                  lg: "4xl",
                }}
                color="textColor"
                fontWeight="bold"
                mb={"10px"}
              >
                <BreadcrumbItem>
                  <Text textTransform="uppercase" letterSpacing="2px">
                    {tvDetail?.title || tvDetail?.name}
                  </Text>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Box>{dateFormated}</Box>
                </BreadcrumbItem>
              </Breadcrumb>

              <Flex align={"center"}>
                <Text
                  color="primaryColor"
                  lineHeight={"0"}
                  fontWeight="bold"
                  fontSize={"18px"}
                >
                  {tvDetail?.vote_average.toFixed(1)}
                </Text>
                <StarIcon color="yellow" ml="5px" />
              </Flex>
            </Box>
            {/* overview */}
            <Box
              fontSize={{
                base: "sm",
                lg: "lg",
              }}
              fontWeight="medium"
            >
              <Text>{tvDetail?.overview}</Text>
            </Box>
            {/* area & genres */}
            <Box
              fontSize={{
                base: "xs",
                md: "sm",
                lg: "lg",
              }}
            >
              <Flex align="center">
                <Text mr="10px" color={"textColor"}>
                  Genre :
                </Text>
                <Breadcrumb separator="," spacing="3px">
                  {tvDetail?.genres?.map((item) => (
                    <BreadcrumbItem key={item.id}>
                      <Link to={`genres/${item.id}`}>{item.name}</Link>
                    </BreadcrumbItem>
                  ))}
                </Breadcrumb>
              </Flex>
            </Box>
          </Box>

          {/* Trailer Button */}
          {trailerKey && (
            <Box mb="4">
              <Button
                onClick={() => {
                  const trailerUrl = `https://www.youtube.com/watch?v=${trailerKey}`;
                  window.open(trailerUrl, "_blank");
                }}
                variant="outline"
                colorScheme="blue"
              >
                Watch Trailer
              </Button>
            </Box>
          )}

          {/* season */}
          <Box>
            {tvDetail?.seasons?.map((item, i) => {
              const seasonDateFormated = moment(item?.air_date).format(
                "MMMM Do YYYY"
              );
              return (
                <Flex
                  key={i}
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                  borderWidth="1px"
                  borderRadius="lg"
                  p="4"
                  mb="8"
                  alignItems={"start"}
                  columnGap="8"
                  minH={"300px"}
                >
                  <Image
                    objectFit="cover"
                    display={{ base: "none", md: "block" }}
                    maxW={{ base: "100%", sm: "200px" }}
                    src={`${config?.images?.base_url}/original/${item.poster_path}`}
                    alt={`${item.name} poster`}
                  />

                  <Stack flexGrow={1} minH={"300px"}>
                    <Stack flexGrow={1} mt="4">
                      <Heading
                        size="lg"
                        display={"inline-block"}
                        mb="2"
                      >
                        {item.name} - {seasonDateFormated || ""}
                      </Heading>
                      <Heading size={"md"} mb={"6"}>
                        {item.episode_count} episodes
                      </Heading>
                      <Text flexGrow={1} h="full" py="2" color={"decsColor"}>
                        {item.overview ||
                          `${item.name} of ${
                            tvDetail?.title || tvDetail?.name
                          } premiered on ${seasonDateFormated || "N/A"}`}
                      </Text>
                    </Stack>
                    <Box display={"block"}>
                      <Link to={`/tv/${id}/season/${item.season_number}`}>
                        <Button
                          mb="6"
                          variant="solid"
                          colorScheme="blue"
                        >
                          Watch Now
                        </Button>
                      </Link>
                    </Box>
                  </Stack>
                </Flex>
              );
            })}
          </Box>
          {/* likeList */}
          {tvDetail?.recommendations?.results?.length > 0 && (
            <Box>
              <Heading fontSize="2xl" mt="50px">
                Similar
              </Heading>
              <ListFilmLayout listFilm={tvDetail?.recommendations?.results} />
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


