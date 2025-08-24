import React from "react";
import "./DifficultySelector.css"; // Import CSS file

function DifficultySelector({ questions, onChange }) {
  // Initialize all questions as Easy
  const [levels, setLevels] = React.useState(
    Object.fromEntries(questions.map((q) => [q, "Easy"]))
  );

  const handleChange = (q, value) => {
    const newLevels = { ...levels, [q]: value };
    setLevels(newLevels);
    onChange(newLevels);
  };

  return (
    <div className="difficulty-container">
      <h2 className="difficulty-title">Select Difficulty Levels</h2>
      <div className="difficulty-grid">
        {questions.map((q) => (
          <div key={q} className="difficulty-card">
            <label className="question-label">{q}</label>
            <select
              className="difficulty-select"
              value={levels[q]} // Set default to Easy
              onChange={(e) => handleChange(q, e.target.value)}
            >
              <option value="Easy">🟢 Easy</option>
              <option value="Medium">🟡 Medium</option>
              <option value="Hard">🔴 Hard</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DifficultySelector;
