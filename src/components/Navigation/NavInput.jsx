/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Input } from "@chakra-ui/react";
import React, { memo, useRef, useState } from "react";
import { Search2Icon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";

import { multiSearch } from "../../services/searchSlice";
import SearchTopKeyWordsList from "./SearchTopKeyWordsList";

const NavInput = () => {
  const dispatch = useDispatch();
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);

    // Perform search and update search results
    dispatch(
      multiSearch({
        path: "search/multi",
        params: {
          query: e.target.value,
        },
      })
    ).then((results) => {
      setSearchResults(results); // Update search results
    });
  };

  const handleSearchWithKeyWord = () => {
    // Perform search and update search results
    dispatch(
      multiSearch({
        path: "search/multi",
        params: {
          query: searchText,
        },
      })
    ).then((results) => {
      setSearchResults(results); // Update search results
    });
  };

  const handlePressEnter = (e) => {
    if (e.key === "Enter") {
      handleSearchWithKeyWord();
    }
  };

  return (
    <>
      <Box
        w={{
          base: "55%",
          lg: "40%",
        }}
        position="relative"
        ml="auto"
        mr={{ lg: "10px" }}
      >
        <Box position="relative" overflow="hidden">
          <Input
            variant="flushed"
            autoCapitalize="off"
            position="relative"
            focusBorderColor="primaryColor"
            placeholder="-_-"
            _placeholder={{
              color: "decsColor",
            }}
            value={searchText}
            onChange={(e) => handleSearchTextChange(e)}
            fontSize={{
              base: "sm",
              md: "md",
            }}
            w="full"
            pr="40px"
            pl="5px"
            onKeyDown={(e) => handlePressEnter(e)}
          />
          {/* search icon */}
          <Box
            position="absolute"
            right="15px"
            top="50%"
            transform="translateY(-50%)"
            zIndex={500}
            fontSize="20px"
            color="textColor"
            cursor={"pointer"}
            onClick={() => handleSearchWithKeyWord()}
          >
            <Search2Icon />
          </Box>
        </Box>
      </Box>

      {/* Below the nav bar, the separate search bar */}
      <Box
        w="100%" // Full width
        position="fixed"
        top="60px" // Adjust the top position based on your nav bar's height
        bg="white" // Adjust the background color as needed
        boxShadow="sm" // Add shadow as needed
        zIndex="999" // Ensure it's above other elements
        p="2"
      >
        {/* Your separate search bar content */}
        <SearchTopKeyWordsList
          searchResults={searchResults}
          handleClickListKeyWords={(text) => {
            setSearchText(text);
            handleSearchWithKeyWord();
          }}
        />
      </Box>
    </>
  );
};

export default memo(NavInput);
