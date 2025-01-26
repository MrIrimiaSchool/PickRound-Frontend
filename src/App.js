import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import RandomPickerPage from "./Components/RandomPickerPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/randompicker" element={<RandomPickerPage />} />
    </Routes>
  );
}

export default App;
