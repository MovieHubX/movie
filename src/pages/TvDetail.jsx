import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Center,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FaYoutube } from "react-icons/fa"; // Import FaYoutube icon

import ListFilmLayout from "../components/Layout/ListFilmLayout";
import Loading from "../components/Loading/Loading";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";

import { getConfigSelector, tvDetailSelector } from "../redux/selector";
import { getTvDetail } from "../services";
import moment from "moment/moment";

export const TvDetail = () => {
  const dispatch = useDispatch();
  const player = useRef();
  const params = useParams();
  const { id } = params;

  const { tvDetail, status } = useSelector(tvDetailSelector);
  const { config } = useSelector(getConfigSelector);

  const handleFindTrailerKey = useCallback(() => {
    const youtubeVideos = tvDetail?.videos?.results?.filter(
      (item) => item?.site === "YouTube"
    );
    const trailer = youtubeVideos?.find((item) => item?.type === "Trailer");
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
      {status === "done" ? (
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
                    {tvDetail?.title || tvDetail?.name}
                  </Text>
                </BreadcrumbItem>
              </Breadcrumb>

              <Flex align={"center"}>
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
                    {tvDetail?.vote_average.toFixed(1)}
                  </Text>
                  <StarIcon color="yellow" boxSize="1em" />
                </Box>

                {trailerKey && (
                  <Box ml="4">
                    <Button
                      onClick={() => {
                        const trailerUrl = `https://www.youtube.com/watch?v=${trailerKey}`;
                        window.open(trailerUrl, "_blank");
                      }}
                      variant="outline"
                      colorScheme="red"
                      border="1px solid"
                      borderColor="red.500"
                      borderRadius="md"
                      px="3"
                    >
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
              <Text>{tvDetail?.overview}</Text>
            </Box>
            
            <Flex align="center">
              <Box mr="10px" color={"textColor"}>
                Genre :
              </Box>
              <Breadcrumb separator="," spacing="3px">
                {tvDetail?.genres?.map((item) => {
                  return (
                    <BreadcrumbItem key={item.id}>
                      <Link to={`genres/${item.id}`}>{item.name}</Link>
                    </BreadcrumbItem>
                  );
                })}
              </Breadcrumb>
            </Flex>
          </Box>

          {/* season */}
          <Box>
            {tvDetail?.seasons?.map((item, i) => {
              const seasonDateFormated = moment(item?.air_date).format("MMMM Do YYYY");
              return (
                <Flex
                  key={i}
                  direction={{ base: 'column', sm: 'row' }}
                  overflow='hidden'
                  variant='outline'
                  borderWidth='1px'
                  borderRadius='lg'
                  p='4'
                  mb='8'
                  alignItems={'start'}
                  columnGap='8'
                  minH={'300px'}
                >
                  <Image
                    objectFit='cover'
                    display={{ base: 'none', md: 'block' }}
                    maxW={{ base: '100%', sm: '200px' }}
                    src={`${config?.images?.base_url}/original/${item.poster_path}`}
                    alt={`${item.name} poster`}
                  />

                  <Stack flexGrow={1} minH={'300px'}>
                    <Stack flexGrow={1} mt='4'>
                      <Heading
                        size='lg' display={'inline-block'} mb='2'
                      >
                        {item.name} - {seasonDateFormated || ''}
                      </Heading>
                      <Heading size={'md'} mb={'6'}>
                        {item.episode_count} episodes
                      </Heading>
                      <Text flexGrow={1} h='full' py='2' color={'decsColor'}>
                        {item.overview || `${item.name} of ${tvDetail?.title || tvDetail?.name} premiered on ${seasonDateFormated || 'N/A'}`}
                      </Text>
                    </Stack>
                    <Box display={'block'}>
                      <Link to={`/tv/${id}/season/${item.season_number}`}>
                        <Button mb='6' variant='solid' colorScheme='blue'>
                          Watch Now
                        </Button>
                      </Link>
                    </Box>
                  </Stack>
                </Flex>
              )
            })}
          </Box>

          {/* likeList */}
          {tvDetail?.recommendations?.results?.length > 0 && (
            <Box>
              <Heading fontSize="2xl" mt="50px">
                Similar
              </Heading>
              <ListFilmLayout
                listFilm={tvDetail?.recommendations?.results}
              />
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
