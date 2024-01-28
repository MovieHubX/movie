import { Search2Icon } from "@chakra-ui/icons";
import { Box, Input } from "@chakra-ui/react";
import React, { memo, useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  multiSearch
} from "../../services/searchSlice";
import SearchTopKeyWordsList from "./SearchTopKeyWordsList";

const NavInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const searchInput = useRef(null);
  const [, startTransition] = useTransition()
  const [searchText, setSearchText] = useState('');
  const [queryText, setQueryText] = useState('')
  const [isShow, setIsShow] = useState(false);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
    startTransition(() => {
      setQueryText(e.target.value);
      setIsShow(true);
      // You can dispatch the search action here if you want real-time results
    })
  };

  const handleSearchWithKeyword = useCallback(() => {
    // Dispatch the search action with the latest query text
    dispatch(
      multiSearch({
        path: "search/multi",
        params: {
          query: queryText,
        },
      })
    );

    // Navigate to the search page
    navigate(`/search`);
    searchInput.current.blur();
    setIsShow(false);
  }, [dispatch, navigate, queryText]);

  const handlePressEnter = (e) => {
    if (e.key === "Enter") {
      handleSearchWithKeyword();
    }
  };

  return (
    <Box
      w={{
        base: "55%",
        lg: "40%",
      }}
      position="relative"
      ml="auto"
      mr={{ lg: "50px" }}
    >
      <Box position="relative" overflow="hidden">
        <Input
          variant="flushed"
          autoCapitalize="off"
          position="relative"
          focusBorderColor="primaryColor"
          placeholder="Search by name"
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
          w="full"
          pr="40px"
          pl="5px"
          onKeyDown={(e) => handlePressEnter(e)}
        />

        {/* Search icon */}
        <Box
          position="absolute"
          right="15px"
          top="50%"
          transform="translateY(-50%)"
          zIndex={500}
          fontSize="20px"
          color="textColor"
          cursor={"pointer"}
          onClick={handleSearchWithKeyword}
        >
          <Link to="/search">
            <Search2Icon />
          </Link>
        </Box>
      </Box>

      {isShow && (
        <SearchTopKeyWordsList
          handleClickListKeyWords={handleSearchWithKeyword}
        />
      )}
    </Box>
  );
};

export default memo(NavInput);
