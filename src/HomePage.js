import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  VStack,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import BACKEND_URL from "./configuration";

function HomePage() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  // Fetch proiecte din backend
  useEffect(() => {
    fetch(`${BACKEND_URL}/projects`)
      .then((response) => response.json())
      .then((data) => {
        setProjects(data.projects || []); // Setare proiecte
        toast({
          title: "Projects Loaded",
          description: "Projects fetched successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch(() =>
        toast({
          title: "Error",
          description: "Failed to fetch projects.",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      );
  }, []);

  const handleNavigate = () => {
    if (!selectedProject) {
      toast({
        title: "Error",
        description: "Please select a project.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Navigare cu parametrii
    navigate(`/randompicker`, { state: { project: selectedProject } });
  };

  return (
    <Box
      bgGradient="linear(to-r, teal.500, blue.500)"
      p={10}
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <VStack
        spacing={6}
        bg="white"
        p={10}
        borderRadius="lg"
        boxShadow="2xl"
        maxW="md"
        w="full"
        align="center"
      >
        {/* Titlul principal */}
        <Heading
          size="lg"
          color="teal.600"
          textShadow="1px 1px #D0E8F2"
          fontWeight="extrabold"
        >
          Pick Round
        </Heading>

        {/* Dropdown pentru selectarea proiectului */}
        <Select
          placeholder="Select a project"
          value={selectedProject?.id || ""}
          onChange={(e) => {
            const selected = projects.find(
              (project) => project.id === parseInt(e.target.value)
            );
            setSelectedProject(selected);
          }}
          bg="white"
          borderColor="teal.400"
          focusBorderColor="teal.600"
          _hover={{ borderColor: "teal.600" }}
          boxShadow="sm"
          size="lg"
        >
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </Select>

        {/* Butonul de continuare */}
        <Button
          colorScheme="teal"
          size="lg"
          w="full"
          onClick={handleNavigate}
          isDisabled={!selectedProject}
        >
          Continue
        </Button>
      </VStack>
    </Box>
  );
}

export default HomePage;
