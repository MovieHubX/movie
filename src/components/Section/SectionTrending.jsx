import React, { Fragment, memo } from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Film from "../Film/Film";
import { getConfigSelector } from "../../redux/selector";
import { useSelector } from "react-redux";
import ButtonBg from "../Buttons/ButtonBg";

const SectionTrending = ({ data = [], name, trendingInWeek, setTrendingInWeek }) => {
  const { config } = useSelector(getConfigSelector);

  return (
    <Box mb="50px">
      <Flex mb="30px" justify="space-between" align="center">
        <Flex justify="center" align="center" columnGap={8}>
          {/* heading */}
          <Box>
            <Heading
              textTransform="capitalize"
              fontSize={{
                base: "xl",
                md: "2xl",
                lg: "3xl",
              }}
            >
              {data?.homeSectionName || name}
            </Heading>
          </Box>
          {/* change time */}
          <Flex
            overflow="hidden"
            display={{ base: "none", md: "flex" }}
            rounded="3xl"
            border="rgba(50, 138, 241, 1) 1px solid"
            justify="space-between"
            align="center"
            w="234px"
            py="5px"
            fontWeight="bold"
            color="#fff"
            position="relative"
            cursor="pointer"
            textAlign="center"
          >
            {/* This Week */}
            <Box
              w="50%"
              onClick={() => setTrendingInWeek((prev) => !prev)}
            >
              <Box
                color={trendingInWeek ? "#fff" : "primaryColor"}
                pos="relative"
                bg="transparent"
                zIndex={1}
              >
                This Week
              </Box>
            </Box>

            {/* Today */}
            <Box
              w="50%"
              onClick={() => setTrendingInWeek((prev) => !prev)}
            >
              <Box
                pos="relative"
                color={trendingInWeek ? "primaryColor" : "#fff"}
                bg="transparent"
                zIndex={1}
              >
                Today
              </Box>
            </Box>
          </Flex>
        </Flex>
        <Link to={`/trending/${trendingInWeek ? "week" : "day"}`}>
          <ButtonBg>
            More
            <ArrowForwardIcon ml={2} />
          </ButtonBg>
        </Link>
      </Flex>

      {/* Two rows of trending items */}
      <Flex flexWrap="wrap" justifyContent="space-between">
        {data?.map((item, index) => {
          if (index < 10) { // 10 items for 2 rows
            return (
              <Box key={item.id} width={{ base: "50%", md: "20%" }} marginBottom="20px">
                <Film
                  baseUrl={`${config?.images?.base_url}/original/`}
                  media_type={item.media_type}
                  id={item.id}
                  vote_average={item.vote_average}
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
    </Box>
  );
};

export default memo(SectionTrending);
