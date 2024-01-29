/* eslint-disable react-hooks/exhaustive-deps */
import { Search2Icon } from "@chakra-ui/icons";
import { Box, Flex, Input, Stack } from "@chakra-ui/react";
import React, { memo, useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { multiSearch } from "../../services/searchSlice";
import SearchTopKeyWordsList from "./SearchTopKeyWordsList";
import MenuMobile from "./MenuMobile";

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

  const handleSearchWithKeyWord = useCallback((text = queryText) => {
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
      setIsSearchOpen(false); // Close search bar after search
    } else {
      // If search bar is empty, focus on the input field
      searchInput.current.focus();
    }
  }, [queryText, navigate]);

  const handlePressEnter = (e) => {
    if (e.key === "Enter") {
      handleSearchWithKeyWord();
    }
  };

  const handleSearchIconClick = () => {
    setIsSearchOpen(!isSearchOpen);
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
      setIsSearchOpen(true); // Open search bar on input focus
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
    <Box
      position="absolute"
      left="0"
      right="0"
      zIndex={999}  // Adjust zIndex as needed
      bg="rgba(21, 31, 50, 1)"
      transition="top 0.3s ease-in-out"  // Add transition effect
      display={isSearchOpen ? "block" : "none"}  // Control display based on search bar open state
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
  );
};

const Menu = () => {
  return (
    <Flex alignItems={"center"}>
      <Stack direction={"row"} spacing={7}>
        {/* Search Icon */}
        <Box fontSize="20px" color="textColor" cursor="pointer" onClick={handleSearchIconClick}>
          <Search2Icon />
        </Box>

        {/* Menu desktop */}
        <HStack spacing="30px" display={{ base: "none", lg: "flex" }}>
          {/* ... (previous code for desktop menu) */}
        </HStack>

        {/* Menu mobile */}
        <MenuMobile navs={navs} />
      </Stack>
    </Flex>
  );
};

const Navigation = () => {
  return (
    <Box zIndex="100" position={"relative"}>
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        w="full"
        zIndex="100"
        boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px"
        bg={'primaryDarkColor'}
      >
        <Box layerStyle={"containerStyles"}>
          <Flex
            h={"55px"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            {/* Logo */}
            <Box fontWeight="extrabold" color="primaryColor" fontSize="lg">
              <Link to="/">MovieHubX</Link>
            </Box>

            {/* Input */}
            <NavInput />

            {/* Menu */}
            <Menu />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(Navigation);
