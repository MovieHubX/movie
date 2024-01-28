import { Search2Icon } from "@chakra-ui/icons";
import { Box, Input } from "@chakra-ui/react";
import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { multiSearch } from "../../services/searchSlice";
import SearchTopKeyWordsList from "./SearchTopKeyWordsList";

const NavInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
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
      setSearchText("");
      navigate(`/search`);
      setIsSearchBarVisible(false);
    }
  };

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

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
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearchWithKeyWord();
          }}
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

      {isSearchBarVisible && (
        <SearchTopKeyWordsList
          handleClickListKeyWords={handleSearchWithKeyWord}
        />
      )}
    </Box>
  );
};

export default memo(NavInput);
