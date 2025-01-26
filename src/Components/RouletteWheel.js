import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { VStack, Button, Text } from "@chakra-ui/react";

const RouletteWheel = ({ teams = [], onSelect = () => {} }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  // Verificăm dacă teams este valid
  const data = Array.isArray(teams)
    ? teams.map((team) => ({ option: team }))
    : [];

  const handleSpin = () => {
    if (data.length === 0) return; // Prevenim eroarea dacă nu există echipe
    const randomIndex = Math.floor(Math.random() * data.length);
    setPrizeNumber(randomIndex);
    setMustSpin(true);
  };

  const handleStop = () => {
    setMustSpin(false);
    if (data.length > 0) {
      onSelect(teams[prizeNumber]); // Notificăm echipa selectată
    }
  };

  return (
    <VStack spacing={6}>
      {data.length > 0 ? (
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={["#6875F5", "#202124"]}
          textColors={["#ffffff"]}
          onStopSpinning={handleStop}
          outerBorderColor="#000000"
          outerBorderWidth={5}
          radiusLineColor="#000000"
          radiusLineWidth={2}
          fontSize={18}
          spinDuration={0.4}
          disableInitialAnimation={true}
        />
      ) : (
        <Text color="red.500" fontSize="xl">
          No teams available to spin.
        </Text>
      )}
      <Button colorScheme="teal" onClick={handleSpin} isDisabled={data.length === 0}>
        Spin the Wheel
      </Button>
    </VStack>
  );
};

export default RouletteWheel;
