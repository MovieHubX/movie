import { Search2Icon } from "@chakra-ui/icons";
import { Box, Input } from "@chakra-ui/react";
import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { multiSearch, clearSearchResults } from "../../services/searchSlice";
import SearchTopKeyWordsList from "./SearchTopKeyWordsList";

const NavInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const searchResults = useSelector((state) => state.search.results);

  const handleSearchTextChange = (e) => {
    const newSearchText = e.target.value;
    setSearchText(newSearchText);
    dispatch(multiSearch({ path: "search/multi", params: { query: newSearchText } }));
  };

  const handleSearchWithKeyWord = () => {
    const text = searchText.trim();
    if (text) {
      dispatch(
        multiSearch({
          path: "search/multi",
          params: {
            query: text,
          },
        })
      );
      navigate(`/search`);
    }
  };

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  const handlePressEnter = (e) => {
    if (e.key === "Enter") {
      handleSearchWithKeyWord();
    }
  };

  useEffect(() => {
    if (isSearchBarVisible) {
      searchInput.current.focus();
    }
  }, [isSearchBarVisible]);

  useEffect(() => {
    // Clear search results when the component unmounts
    return () => {
      dispatch(clearSearchResults());
    };
  }, [dispatch]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      ml={{ lg: "50px" }}
    >
      {/* Search icon */}
      <Box
        fontSize="20px"
        color="textColor"
        cursor="pointer"
        marginRight="15px"
        onClick={toggleSearchBar}
      >
        <Search2Icon />
      </Box>

      {/* Search input */}
      <Box
        position="relative"
        width={isSearchBarVisible ? "200px" : "0"}
        overflow="hidden"
        transition="width 0.3s ease"
      >
        <Input
          variant="flushed"
          autoCapitalize="off"
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
          pr="40px"
          pl="5px"
          onKeyDown={(e) => handlePressEnter(e)}
          ref={searchInput}
        />
        {/* Search icon within the input */}
        <Box
          position="absolute"
          right="15px"
          top="50%"
          transform="translateY(-50%)"
          zIndex={500}
          fontSize="20px"
          color="textColor"
          cursor="pointer"
          onClick={handleSearchWithKeyWord}
        >
          <Search2Icon />
        </Box>
      </Box>

      {isSearchBarVisible && searchResults && searchResults.length > 0 && (
        <SearchTopKeyWordsList
          handleClickListKeyWords={handleSearchWithKeyWord}
          searchResults={searchResults}
        />
      )}
    </Box>
  );
};

export default memo(NavInput);
