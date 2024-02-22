import React, { memo } from "react";
import { Link } from "react-router-dom";

import { Box, Flex, HStack, Stack } from "@chakra-ui/react";
import MenuMobile from "./MenuMobile";
import NavInput from "./NavInput";
import { navs } from "../Constans";

const Menu = () => {
  return (
    <Flex alignItems={"center"}>
      <Stack direction={"row"} spacing={7}>
        {/* Menu desktop */}
        <HStack spacing="30px" display={{ base: "none", lg: "flex" }}>
          {navs.map((nav, index) => (
            <Box key={index} role={"group"} transition={"all 0.3s ease"} pos={"relative"}>
              <Box color="textColor" fontWeight={"bold"} _hover={{ color: "primaryColor" }}>
                <Link to={nav.href}>{nav.name}</Link>
              </Box>
              {nav.subs && (
                <>
                  <Box
                    pos="absolute"
                    top={"25px"}
                    left="0"
                    bg={"#384e7b"}
                    pl="10px"
                    pr="30px"
                    h="0"
                    rounded={"md"}
                    opacity={0}
                    _groupHover={{ h: "120px", opacity: "1", paddingY: "10px" }}
                    transition={"all 0.3s ease"}
                  >
                    {nav.subs.map((sub, index) => (
                      <Box key={index} w="max-content" fontWeight={"semibold"} transition={".1s all"} color="textColor" letterSpacing={"1.7"} _hover={{ color: "primaryColor" }}>
                        {/* Construct proper URL by concatenating nav.href and sub.href */}
                        <Link to={`${nav.href}${sub.href}`}>{sub.name}</Link>
                      </Box>
                    ))}
                  </Box>
                </>
              )}
            </Box>
          ))}
        </HStack>
        {/* Menu mobile */}
        <MenuMobile navs={navs} />
      </Stack>
    </Flex>
  );
};

export default Menu;
