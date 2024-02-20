import React, { Fragment, memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Film from "../Film/Film";
import { getConfigSelector } from "../../redux/selector";
import { useSelector } from "react-redux";
import ButtonBg from "../Buttons/ButtonBg"; 

const Section = ({ data = [], name, type, link = '' }) => {
  const { config } = useSelector(getConfigSelector);
  const [moviesPerRow, setMoviesPerRow] = useState(3);

  useEffect(() => {
    const calculateMoviesPerRow = () => {
      const containerWidth = document.getElementById("section-container")?.offsetWidth;
      if (containerWidth) {
        const newMoviesPerRow = Math.floor(containerWidth / 200); // Assuming poster width of 200px
        setMoviesPerRow(newMoviesPerRow);
      }
    };

    calculateMoviesPerRow();
    window.addEventListener("resize", calculateMoviesPerRow);
    return () => window.removeEventListener("resize", calculateMoviesPerRow);
  }, []);

  const numRows = Math.ceil(data.length / moviesPerRow);
  const movieRows = [];

  for (let i = 0; i < numRows; i++) {
    const moviesInRow = data.slice(i * moviesPerRow, (i + 1) * moviesPerRow);
    movieRows.push(
      <SimpleGrid key={i} columns={[1, 2, moviesPerRow]} spacing={6} mb={6}>
        {moviesInRow.map((movie, j) => (
          <Film
            key={movie.id || j}
            baseUrl={`${config?.images?.base_url}/original/`}
            media_type={type}
            id={movie.id}
            vote_average={movie.vote_average}
            poster_path={movie.poster_path}
            title={movie.title}
            name={movie.name}
          />
        ))}
      </SimpleGrid>
    );
  }

  return (
    <Box mb="50px" id="section-container">
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
        {link && (
          <Link to={link}>
            <ButtonBg>
              More
              <ArrowForwardIcon ml={2} />
            </ButtonBg>
          </Link>
        )}
      </Flex>
      {movieRows}
    </Box>
  );
};

export default memo(Section);
