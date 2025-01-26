import React from "react";
import { VStack, Text, Button, useColorModeValue } from "@chakra-ui/react";
import RouletteWheel from "./RouletteWheel";

function WheelSection({ teams, randomTeam, nextPresenter, onTeamSelect, onReset }) {
    const nextPresenterBg = useColorModeValue("orange.100", "orange.700");

    return (
        <VStack
            spacing={8}
            bg={useColorModeValue("white", "gray.700")}
            p={8}
            borderRadius="lg"
            boxShadow="lg"
            align="center"
        >
            {teams.length > 1 ? (
                <RouletteWheel teams={teams} onSelect={onTeamSelect} />
            ) : (
                <>
                    {randomTeam && (
                        <Text fontSize="2xl" fontWeight="bold" color="green.500">
                            Today presenter: {randomTeam}
                        </Text>
                    )}
                    {nextPresenter && (
                        <Text
                            fontSize="lg"
                            fontWeight="bold"
                            color="orange.600"
                            bg={nextPresenterBg}
                            p={2}
                            borderRadius="md"
                        >
                            {nextPresenter}
                        </Text>
                    )}
                </>
            )}
            <Button colorScheme="red" onClick={onReset}>
                Reset Cycle
            </Button>
        </VStack>
    );
}

export default WheelSection;
