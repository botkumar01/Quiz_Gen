import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import DisplayText from "./components/DisplayText";
import DifficultySelector from "./components/DifficultySelector";
import "./App.css";
import Header from "./components/Header/Header";
import { motion } from "framer-motion";

const PATTERN_QUESTIONS = {
  SEE: {
    sectionA: Array.from({ length: 10 }, (_, i) => `Q${i + 1}`),
    sectionB: Array.from({ length: 5 }, (_, i) => `Q${i + 11}`),
  },
  Sessional: {
    sectionA: Array.from({ length: 5 }, (_, i) => `Q${i + 1}`),
    sectionB: ["Q6", "Q7", "Q8"],
  },
};

function App() {
  const [pattern, setPattern] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [difficulty, setDifficulty] = useState({});
   const logoVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1 } },
  };
  // Flatten all questions based on pattern
  const questions = pattern
    ? [...PATTERN_QUESTIONS[pattern].sectionA, ...PATTERN_QUESTIONS[pattern].sectionB]
    : [];

  // Check if all questions have a difficulty selected
  const allDifficultySelected = questions.length > 0 && Object.keys(difficulty).length === questions.length;

  return (
    // <div style={{ padding: "20px" }}>
      
    <motion.div className="app-container"
    
            alt="KLU Logo"
          
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={logoVariants}>
        {/* <Header /> 
    <h1>jiiiiiiiiiiiiiiiiii</h1> */}
      <h1 className="app-title">📄 Question Paper Generator</h1>

      {/* Step 1: Select Exam Pattern */}
      <div className="pattern-section">
        <h2>Select Exam Type</h2>
        <label className="pattern-option">
          <input
            type="radio"
            value="SEE"
            checked={pattern === "SEE"}
            onChange={(e) => setPattern(e.target.value)}
          />
          Semester End Examination
        </label>
        <label className="pattern-option">
          <input
            type="radio"
            value="Sessional"
            checked={pattern === "Sessional"}
            onChange={(e) => setPattern(e.target.value)}
          />
          Sessional/Internal Examination
        </label>
      </div>

      {/* Step 2: Upload File */}
      <div className="upload-section">
        <h2>Upload Question Bank</h2>
        
        <FileUpload setExtractedText={setExtractedText} />
      </div>

      {/* Step 3: Select Difficulty */}
      {extractedText && pattern && (
        <div className="difficulty-section">
          <DifficultySelector questions={questions} onChange={setDifficulty} />
        </div>
      )}

      {/* Step 4: Generate Questions */}
      {extractedText && pattern && allDifficultySelected && (
        <div className="generate-section">
          <DisplayText text={{ extractedText, pattern, difficulty }} />
        </div>
      )}
    </motion.div>
    // </div>
  );
}

export default App;
