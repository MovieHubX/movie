import React, { Fragment, memo } from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Film from "../Film/Film";
import ButtonBg from "../Buttons/ButtonBg";
import { getConfigSelector } from "../../redux/selector";
import { useSelector } from "react-redux";

const Section = ({ data = [], name, type, link = '' }) => {
  const { config } = useSelector(getConfigSelector);

  return (
    <Box mb="50px">
      <Flex mb="30px" justify="space-between" align="center">
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
        {
          link && (
            <Link to={link}>
              <ButtonBg>
                More
                <ArrowForwardIcon ml={2} />
              </ButtonBg>
            </Link>
          )
        }
      </Flex>

      <Flex flexWrap="wrap" justifyContent="space-between">
        {data?.map((dataItem, i) => {
          if (i < 18) {
            return (
              <Film
                key={dataItem.id}
                baseUrl={`${config?.images?.base_url}/original/`}
                media_type={type}
                id={dataItem.id}
                vote_average={dataItem.vote_average}
                poster_path={dataItem.poster_path}
                title={dataItem.title}
                name={dataItem.name}
              />
            );
          }
          return null;
        })}
      </Flex>
    </Box>
  );
};

export default memo(Section);
