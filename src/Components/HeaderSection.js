import React from "react";
import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";

function HeaderSection({ projectName }) {
  return (
    <Flex justify="center" mb={8}>
      <Heading
        size="2xl"
        color={useColorModeValue("teal.600", "teal.300")}
        textShadow="2px 2px #D0E8F2"
        fontWeight="extrabold"
      >
        🎯 {projectName}
      </Heading>
    </Flex>
  );
}

export default HeaderSection;
