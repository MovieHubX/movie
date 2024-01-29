import {
  Box, ListItem, OrderedList, Text
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { multiSearchSelector } from "../../redux/selector";

const SearchTopKeyWordsList = ({ handleClickListKeyWords }) => {
  const data = useSelector(multiSearchSelector);

  // Filter out duplicate titles
  const uniqueTitles = Array.from(new Set(data.map(item => item.title)));

  if (uniqueTitles.length > 0) {
    return (
      <Box
        w="full"
        position="absolute"
        left="0"
        right="0"
        bg="#384e7b"
        transform={"translateY(7px)"}
        px="5px"
        py="10px"
        pl={'0'}
        shadow='lg'
        zIndex="100"
        rounded="5px"
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
      >
        <OrderedList fontSize="14px" fontWeight="light">
          {uniqueTitles.map((title, i) => {
            const matchingItem = data.find(item => item.title === title);

            if (matchingItem && matchingItem.title) {
              return (
                <ListItem
                  key={matchingItem.id}
                  display="flex"
                  alignItems="center"
                  cursor="pointer"
                  columnGap={"10px"}
                  _notLast={{ marginBottom: "5px" }}
                  onClick={() => handleClickListKeyWords(matchingItem.title)}
                  _hover={{
                    color: "primaryColor",
                  }}
                  w="full"
                >
                  <Text
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    cursor="pointer"
                  >
                    {matchingItem.title}
                  </Text>
                </ListItem>
              );
            }

            return null;
          })}
        </OrderedList>
      </Box>
    );
  } else {
    return null; // Don't render anything if there are no suggestions
  }
};

export default SearchTopKeyWordsList;
