import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const analyzeMaterial = async (content) => {
  try {
    const prompt = `
You are an AI study assistant.

Analyze the following study material.

Identify the most important topics that a student should study.

Return ONLY valid JSON in this exact format:

[
  {
    "topic": "Topic name",
    "importance": "high",
    "reason": "Short reason"
  }
]

Rules:
- importance must be only "high", "medium", or "low"
- Give 5 to 10 important topics
- Do not add markdown
- Do not add explanation outside JSON

Study Material:
${content}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const text = response.text.trim();

    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("AI analysis error:", error.message);
    throw new Error("Failed to analyze material");
  }
};

//generate quize
export const generateQuizQuestions = async (content, topics, questionCount) => {
  try {
    const prompt = `
You are an AI quiz generator.

Create a quiz from the study material below.

Selected topics:
${topics.join(", ")}

Return ONLY valid JSON in this exact format:

[
  {
    "question": "Question here",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "answer": "Correct answer"
  }
]

Rules:
- Generate exactly ${questionCount} questions.
- Each question must have exactly 4 options.
- Only one option must be correct.
- The answer must exactly match one of the options.
- Questions must be based only on the provided study material.
- Do not add markdown.
- Do not add explanation outside JSON.

Study Material:
${content}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const text = response.text.trim();

    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("AI quiz generation error:", error.message);
    throw new Error("Failed to generate quiz");
  }
};
