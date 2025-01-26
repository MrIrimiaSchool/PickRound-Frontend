import React from "react";
import { Box, Heading, VStack, Text, Button, Divider, HStack } from "@chakra-ui/react";

function AvailableTeams({ teams, background, onDelete }) {
    return (
        <Box
            border="2px"
            borderColor="blue.500"
            borderRadius="lg"
            p={6}
            bg={background}
            boxShadow="lg"
            transition="transform 0.3s ease"
            _hover={{ transform: "scale(1.02)" }}
        >
            <Heading size="lg" mb={4} color="blue.700" textAlign="center">
                Available Teams
            </Heading>
            <Divider mb={4} borderColor="blue.300" />
            <VStack spacing={3} align="start">
                {teams.map((team) => (
                    <HStack key={team} justify="space-between" w="full">
                        <Text
                            fontSize="lg"
                            fontWeight="bold"
                            color="blue.800"
                        >
                            {team}
                        </Text>
                        <Button
                            size="sm"
                            colorScheme="red"
                            onClick={() => onDelete(team)}
                        >
                            Delete
                        </Button>
                    </HStack>
                ))}
            </VStack>
        </Box>
    );
}

export default AvailableTeams;
