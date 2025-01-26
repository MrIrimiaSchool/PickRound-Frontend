import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, useColorModeValue, VStack, Flex } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import HeaderSection from "./HeaderSection";
import AvailableTeams from "./AvailableTeams";
import WheelSection from "./WheelSection";
import HistorySection from "./HistorySection";

function RandomPickerPage() {
  const location = useLocation();
  const [teams, setTeams] = useState([]);
  const [randomTeam, setRandomTeam] = useState(null);
  const [nextPresenter, setNextPresenter] = useState("");
  const [history, setHistory] = useState([]);

  const selectedProject = location.state?.project || {};
  const projectId = selectedProject.id;

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const sectionBg = useColorModeValue("white", "gray.700");

  // Animații pentru Framer Motion
  const animationVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Fetch echipele și istoricul pentru proiect
  useEffect(() => {
    const fetchProjectState = async () => {
      try {
        const response = await fetch(`https://pickround.onrender.com/projects/${projectId}/state`);
        const data = await response.json();

        if (data.last_presenter && data.next_presenter) {
          setRandomTeam(data.last_presenter);
          setNextPresenter(
            `Next time presenter: ${data.next_presenter} on ${new Date(
              data.next_presentation_date
            ).toLocaleDateString()}`
          );
        }
      } catch (error) {
        console.error("Failed to fetch project state:", error);
      }
    };

    const fetchTeams = async () => {
      try {
        const response = await fetch(`https://pickround.onrender.com/projects/${projectId}/populate-teams`, {
          method: "POST",
        });
        const data = await response.json();

        if (data.teams && Array.isArray(data.teams)) {
          setTeams(data.teams);
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      }
    };

    const fetchHistory = async () => {
      try {
        const response = await fetch(`https://pickround.onrender.com/projects/${projectId}/history`);
        const data = await response.json();

        if (data.history && Array.isArray(data.history)) {
          setHistory(data.history);
        } else {
          console.error("Invalid history format:", data);
        }
      } catch (error) {
        console.error("Failed to fetch history:", error);
      }
    };

    fetchProjectState();
    fetchTeams();
    fetchHistory();
  }, [projectId]);

  const handleDeleteTeam = async (teamName) => {
    try {
      const response = await fetch(
        `https://pickround.onrender.com/projects/${projectId}/teams/${teamName}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to delete team:", errorData.message);
        return;
      }

      setTeams((prevTeams) => prevTeams.filter((team) => team !== teamName));
    } catch (error) {
      console.error("Failed to delete team:", error);
    }
  };

  const handleTeamSelect = async (selectedTeam) => {
    setRandomTeam(selectedTeam);

    const remainingTeams = teams.filter((team) => team !== selectedTeam);
    setTeams(remainingTeams);

    // Actualizare vizuală instantanee a istoricului
    const updatedHistory = [
        { team_name: selectedTeam, selected_at: new Date().toISOString() },
        ...history,
    ];
    setHistory(updatedHistory);

    if (remainingTeams.length === 1) {
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + 7);

        try {
            await fetch(`https://pickround.onrender.com/projects/${projectId}/finalize`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    lastPresenter: selectedTeam,
                    nextPresenter: remainingTeams[0],
                }),
            });

            setNextPresenter(
                `Next time presenter: ${remainingTeams[0]} on ${nextDate.toLocaleDateString()}`
            );
        } catch (error) {
            console.error("Failed to finalize project state:", error);
        }
    }

    try {
        await fetch(`https://pickround.onrender.com/projects/${projectId}/update-teams`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ teams: remainingTeams }),
        });
    } catch (error) {
        console.error("Failed to update teams in database:", error);
    }

    try {
        await fetch(`https://pickround.onrender.com/projects/${projectId}/history`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ teamName: selectedTeam }),
        });
    } catch (error) {
        console.error("Failed to save history entry:", error);
    }
};

  const handleReset = async () => {
    setRandomTeam(null);
    setNextPresenter("");

    try {
      const response = await fetch(`https://pickround.onrender.com/projects/${projectId}/reset-teams`, {
        method: "POST",
      });
      const data = await response.json();

      if (data.teams && Array.isArray(data.teams)) {
        setTeams(data.teams);
        fetchHistory();
      } else {
        console.error("Invalid data format during reset:", data);
      }
    } catch (error) {
      console.error("Failed to reset teams:", error);
    }
  };

  return (
    <Box bg={bgColor} p={10} minHeight="100vh" display="flex" flexDirection="column" alignItems="center">
      <HeaderSection projectName={selectedProject.name} />
      <Box
        display="grid"
        gridTemplateColumns="1fr 2fr 1fr"
        gap={8}
        w="90%"
        alignItems="start"
      >
        {/* Available Teams Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={animationVariants}
          style={{ height: "100%" }}
        >
          <AvailableTeams teams={teams} background={sectionBg} onDelete={handleDeleteTeam} />
        </motion.div>

        {/* Middle Section: Wheel and Title */}
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={animationVariants}
        >
          <VStack spacing={8} align="center" justify="center">
            <WheelSection
              teams={teams}
              randomTeam={randomTeam}
              nextPresenter={nextPresenter}
              onTeamSelect={handleTeamSelect}
              onReset={handleReset}
            />
          </VStack>
        </motion.div>

        {/* History Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={animationVariants}
          style={{ height: "100%" }}
        >
          <HistorySection history={history} />
        </motion.div>
      </Box>
    </Box>
  );
}

export default RandomPickerPage;
