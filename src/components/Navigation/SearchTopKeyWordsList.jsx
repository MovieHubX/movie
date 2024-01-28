import {
  Box, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, Divider, Heading, ListItem, OrderedList, Text
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { multiSearchSelector } from "../../redux/selector";

const SearchTopKeyWordsList = ({ handleClickListKeyWords }) => {
  const data = useSelector(multiSearchSelector);
  if(data.length > 0) {
    return (
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <Box
            cursor="pointer"
            position="absolute"
            left="0"
            right="0"
            transform={"translateY(7px)"}
            zIndex="100"
            rounded="5px"
          >
            <Heading as="h6" size="sm" color="white" p="2" textAlign="center">
              Search Suggestions
            </Heading>
          </Box>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <OrderedList fontSize="14px" fontWeight="light">
              {data?.map((item, i) => {
                if (!item.title) return null;
                return (
                  <ListItem
                    key={item.id}
                    display="flex"
                    alignItems="center"
                    cursor="pointer"
                    columnGap={"10px"}
                    _notLast={{ marginBottom: "5px" }}
                    onClick={() => handleClickListKeyWords(item.title)}
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
                      {item.title}
                    </Text>
                  </ListItem>
                );
              })}
              {data?.length === 0 && (
                <Text ml="-10px">No result, please try something else.</Text>
              )}
            </OrderedList>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  }
};

export default SearchTopKeyWordsList;
