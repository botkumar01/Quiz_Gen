import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // or gemini-1.5-pro

app.post("/ask", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "No message provided" });

    const result = await model.generateContent(message);
    let text = await result.response.text(); // get text

    // Remove all * symbols (single or double)
    text = text.replace(/\*+/g, "$"); // replace one or more * with $

    res.json({ text });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "AI service failed: " + error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Node server running at http://localhost:${port}`);
});
