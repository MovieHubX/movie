/* eslint-disable react-hooks/exhaustive-deps */
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
  const navigate = useNavigate();
  const searchInput = useRef(null);
  const [, startTransition] = useTransition();
  const [searchText, setSearchText] = useState('');
  const [queryText, setQueryText] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
    startTransition(() => {
      setQueryText(e.target.value);
      dispatch(
        multiSearch({
          path: "search/multi",
          params: {
            query: e.target.value,
          },
        })
      );
      setIsShow(true);
    });
  };

  const handleSearchWithKeyWord = useCallback((text = queryText, shouldNavigate = true) => {
    if (text) {
      dispatch(
        multiSearch({
          path: "search/multi",
          params: {
            query: text,
          },
        })
      );

      if (shouldNavigate) {
        // navigate to search page
        setSearchText(text);
        navigate(`/search`);
        searchInput.current.blur();
        setIsShow(false);
        setIsSearchOpen(false); // Close search bar after search
      }
    }
  }, [queryText, navigate]);

  const handlePressEnter = (e) => {
    if (e.key === "Enter") {
      handleSearchWithKeyWord();
    }
  };

  const handleSearchIconClick = () => {
    // Trigger search directly without closing the new search bar
    handleSearchWithKeyWord(searchText, false);
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        setIsShow(false);
        setIsSearchOpen(false); // Close search bar on escape key
      }
    };

    const handleOutsideClick = (e) => {
      if (!searchInput.current.contains(e.target)) {
        setIsShow(false);
        setIsSearchOpen(false); // Close search bar on outside click
      }
    };

    const handleInputFocus = () => {
      setIsShow(true);
    };

    const handleInputBlur = () => {
      setIsShow(false);
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("mousedown", handleOutsideClick);
    searchInput.current.addEventListener("focus", handleInputFocus);
    searchInput.current.addEventListener("blur", handleInputBlur);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleOutsideClick);
      searchInput.current.removeEventListener("focus", handleInputFocus);
      searchInput.current.removeEventListener("blur", handleInputBlur);
    };
  }, []);

  return (
    <>
      {/* Navigation Bar */}
      <Box
        w="100%"
        bg="rgba(21, 31, 50, 1)"
        zIndex={1000}
        p="10px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Logo and Navigation Links */}
        <Box>
          {/* Add your logo here */}
          {/* Add your navigation links here */}
        </Box>

        {/* Conditional rendering of the Search Icon */}
        <Box
          fontSize="20px"
          color="textColor"
          cursor="pointer"
          onClick={handleSearchIconClick}
        >
          <Search2Icon />
        </Box>
      </Box>

      {/* Search Bar */}
      <Box
        position="absolute"
        top="55px"
        left="0"
        right="0"
        bg="rgba(21, 31, 50, 1)"
        zIndex={999}
        transition="top 0.3s ease-in-out"
        display={isSearchOpen ? "block" : "none"}
        p="10px"
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
            ref={searchInput}
            fontSize={{
              base: "sm",
              md: "md",
            }}
            onKeyDown={(e) => handlePressEnter(e)}
          />
          <Box
            position="absolute"
            right="15px"
            top="50%"
            transform="translateY(-50%)"
            zIndex={500}
            fontSize="20px"
            color="textColor"
            cursor="pointer"
            onClick={() => handleSearchWithKeyWord()}
          >
            <Link to="/search">
              <Search2Icon />
            </Link>
          </Box>
        </Box>
        {isShow && (
          <SearchTopKeyWordsList
            handleClickListKeyWords={handleSearchWithKeyWord}
          />
        )}
      </Box>
    </>
  );
};

export default memo(NavInput);
