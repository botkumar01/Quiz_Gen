import React, { useState } from "react";
import { askQuestions } from "../services/service";
import { jsPDF } from "jspdf";
import "./DisplayText.css";

function DisplayText({ text }) {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    try {
      const res = await askQuestions(text);
      setResponse(res.text || "");
    } catch (err) {
      console.error(err);
      setResponse("Failed to generate questions");
    }
    setLoading(false);
  };

const handleDownloadPDF = () => {
  if (!response) return;

  const doc = new jsPDF("p", "pt", "a3");
  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;
  const margin = 40;
  const lineHeight = 18;
  const fontSize = 12;
  const textWidth = pageWidth - 2 * margin - 60; // space reserved for marks
  const indent = 20;

  doc.setFontSize(fontSize);
  doc.setFont("helvetica", "normal");

  let y = margin;

  // Header
  doc.setFontSize(16);
  doc.text("HK Generated This Question Paper", pageWidth / 2, y, { align: "center" });
  y += lineHeight * 1.5;
  doc.text(`${text.pattern} Examination`, pageWidth / 2, y, { align: "center" });
  y += lineHeight * 2;
  doc.setFontSize(fontSize);

  const addQuestionLine = (questionText, marks = "") => {
    const wrappedLines = doc.splitTextToSize(questionText, textWidth);
    wrappedLines.forEach((line, index) => {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }

      // Text: first line starts at margin, wrapped lines indented
      const xText = index === 0 ? margin : margin + indent;
      doc.text(line, xText, y);

      // Marks: always aligned at the far right
      if (index === 0 && marks) {
        const marksWidth = doc.getTextWidth(marks); // width of marks string
        const xMarks = pageWidth - margin - marksWidth; // exact right side
        doc.text(marks, xMarks, y);
      }

      y += lineHeight;
    });
  };

  // Split response lines
  const lines = response.split("\n");
  lines.forEach((line) => {
    const match = line.match(/\((\d+)\s*Marks?\)$/);
    let questionText = line;
    let marks = "";
    if (match) {
      marks = match[0]; // e.g., "(2 Marks)"
      questionText = line.replace(marks, "").trim();
    }
    addQuestionLine(questionText, marks);
  });

  doc.save("QuestionPaper.pdf");
};



  return (
    <div className="display-container">
      <button className="generate-btn" onClick={handleAsk} disabled={loading}>
        {loading ? "⚡ Generating..." : "✨ Generate Questions"}
      </button>

      {response && (
        <div className="response-box">
          <h3 className="response-title">📌 Generated Questions:</h3>
          <pre className="response-text">{response}</pre>
          <button className="download-btn" onClick={handleDownloadPDF}>
            📄 Download as PDF
          </button>
        </div>
      )}
    </div>
  );
}

export default DisplayText;
