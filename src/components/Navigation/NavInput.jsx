/* eslint-disable react-hooks/exhaustive-deps */
import { Search2Icon } from "@chakra-ui/icons";
import { Box, Input } from "@chakra-ui/react";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion"; // Import framer-motion

import { multiSearch } from "../../services/searchSlice";
import SearchTopKeyWordsList from "./SearchTopKeyWordsList";

const NavInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [queryText, setQueryText] = useState("");
  const [isShow, setIsShow] = useState(false);

  const inputControl = useAnimation(); // Animation control for input

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
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
  };

  useEffect(() => {
    setIsShow(document.activeElement.tagName === "INPUT");
  }, [document.activeElement.tagName]);

  const handleSearchWithKeyWord = useCallback(
    (text = queryText) => {
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
    },
    [queryText, dispatch, navigate]
  );

  const handlePressEnter = (e) => {
    if (e.key === "Enter") {
      handleSearchWithKeyWord();
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
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      >
        <Input
          as={motion.input} // Use motion.div as a wrapper for the Input
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
          w="full"
          pr="40px"
          pl="5px"
          onKeyDown={(e) => handlePressEnter(e)}
          animate={inputControl}
        />
      </motion.div>

      <Box
        as={motion.div} // Use motion.div for the search icon
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
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

      {isShow && (
        <SearchTopKeyWordsList
          handleClickListKeyWords={handleSearchWithKeyWord}
        />
      )}
    </Box>
  );
};

export default memo(NavInput);
