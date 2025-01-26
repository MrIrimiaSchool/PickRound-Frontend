import React from "react";
import { Box, Heading, VStack, Text, Divider } from "@chakra-ui/react";

function HistorySection({ history }) {
  return (
    <Box
      border="2px"
      borderColor="orange.500"
      borderRadius="lg"
      p={6}
      bg="orange.50"
      boxShadow="lg"
      transition="transform 0.3s ease, box-shadow 0.3s ease"
      _hover={{
        transform: "scale(1.03)",
        boxShadow: "2xl",
      }}
    >
      <Heading size="lg" mb={4} color="orange.700" textAlign="center">
        Selection History
      </Heading>
      <Divider mb={4} borderColor="orange.300" />
      <VStack spacing={3} align="start">
        {history.length > 0 ? (
          history.map((entry, index) => (
            <Text key={index} fontSize="md" fontWeight="bold" color="orange.800">
              {entry.team_name} - {new Date(entry.selected_at).toLocaleString()}
            </Text>
          ))
        ) : (
          <Text fontSize="lg" color="orange.600">
            No history yet.
          </Text>
        )}
      </VStack>
    </Box>
  );
}

export default HistorySection;
