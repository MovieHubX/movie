/* eslint-disable react-hooks/exhaustive-deps */
import { Search2Icon } from "@chakra-ui/icons";
import { Box, Input } from "@chakra-ui/react";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { multiSearch } from "../../services/searchSlice";
import SearchTopKeyWordsList from "./SearchTopKeyWordsList";

const NavInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [queryText, setQueryText] = useState('');
  const [isShow, setIsShow] = useState(false);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchWithKeyWord = useCallback(() => {
    const text = queryText.trim();
    if (text) {
      dispatch(
        multiSearch({
          path: "search/multi",
          params: {
            query: text,
          },
        })
      );
      setSearchText(text);
      navigate(`/search`);
      searchInput.current.blur();
      setIsShow(false);
    }
  }, [queryText, dispatch, navigate]);

  const handlePressEnter = (e) => {
    if (e.key === "Enter") {
      handleSearchWithKeyWord();
    }
  };

  const toggleSearchBar = () => {
    setIsShow(!isShow);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-end" // Align to the right
      ml={{ lg: "50px" }}
    >
      {/* Search icon */}
      <Box
        fontSize="20px"
        color="textColor"
        cursor="pointer"
        onClick={toggleSearchBar}
        zIndex={500}
        marginRight="15px" // Add margin to create a gap
      >
        <Link to="/search">
          <Search2Icon />
        </Link>
      </Box>

      {/* Search input */}
      {isShow && (
        <Box>
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
            ref={searchInput}
            fontSize={{
              base: "sm",
              md: "md",
            }}
            pr="40px"
            pl="5px"
            onKeyDown={(e) => handlePressEnter(e)}
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
            <Link to="/search">
              <Search2Icon />
            </Link>
          </Box>
        </Box>
      )}

      {isShow && (
        <SearchTopKeyWordsList
          handleClickListKeyWords={handleSearchWithKeyWord}
        />
      )}
    </Box>
  );
};

export default memo(NavInput);
