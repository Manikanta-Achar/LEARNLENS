import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

const GenerateQuiz = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const materialId = location.state?.materialId;
  const topics = location.state?.topics || [];
  const quiz = location.state?.quiz || null;

  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState("Medium");

  // Store selected answers
  const [answers, setAnswers] = useState({});

  // Loading states
  const [generating, setGenerating] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Select answer
  const handleAnswerSelect = (questionIndex, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  // Generate quiz
  const handleGenerate = async () => {
    if (!materialId) {
      alert("Material not found.");
      return;
    }

    if (topics.length === 0) {
      alert("Please select at least one topic.");
      return;
    }

    try {
      setGenerating(true);

      const token = localStorage.getItem("token");

      const response = await api.post(
        "/api/quiz/generate",
        {
          materialId: materialId,
          topics: topics.map((topic) => topic.topic),
          questionCount: Number(questionCount),
          difficulty: difficulty,
        },
        {
          headers: {
            token: token,
          },
        },
      );

      console.log("QUIZ RESPONSE:", response.data);

      if (response.data.success) {
        setAnswers({});

        navigate("/generate-quiz", {
          state: {
            materialId: materialId,
            topics: topics,
            quiz: response.data.quiz,
          },
        });
      }
    } catch (error) {
      console.error(
        "Generate quiz error:",
        error.response?.data || error.message,
      );

      alert(error.response?.data?.message || "Failed to generate quiz");
    } finally {
      setGenerating(false);
    }
  };

  // Submit quiz
  const handleSubmitQuiz = async () => {
    if (!quiz?._id) {
      alert("Quiz not found.");
      return;
    }

    const totalQuestions = quiz.questions?.length || 0;

    if (Object.keys(answers).length !== totalQuestions) {
      alert("Please answer all questions before submitting.");
      return;
    }

    try {
      setSubmitting(true);

      const token = localStorage.getItem("token");

      // Convert answers object into array
      const submittedAnswers = quiz.questions.map((question, index) => ({
        questionIndex: index,
        answer: answers[index],
      }));

      console.log("SUBMITTED ANSWERS:", submittedAnswers);

      const response = await api.post(
        "/api/quiz/submit",
        {
          quizId: quiz._id,
          answers: submittedAnswers,
        },
        {
          headers: {
            token: token,
          },
        },
      );

      console.log("QUIZ RESULT:", response.data);

      if (response.data.success) {
        navigate("/quiz-analysis", {
          state: {
            quizId: quiz._id,
            result: response.data.result,
          },
        });
      }
    } catch (error) {
      console.error(
        "Submit quiz error:",
        error.response?.data || error.message,
      );

      alert(error.response?.data?.message || "Failed to submit quiz");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-indigo-600 font-medium">Quiz Generator</p>

          <h1 className="text-3xl font-bold text-gray-800 mt-1">
            Generate Quiz 📝
          </h1>

          <p className="text-gray-500 mt-2">
            Create a quiz from your selected topics.
          </p>
        </div>

        {/* Generate Quiz Form */}
        {!quiz && (
          <div className="max-w-2xl bg-white rounded-2xl border border-gray-100 p-6">
            {/* Selected Topics */}
            <div className="mb-7">
              <h2 className="font-bold text-gray-800 mb-3">Selected Topics</h2>

              <div className="flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <span
                    key={topic._id}
                    className="px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm"
                  >
                    {topic.topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Number of Questions */}
            <div className="mb-7">
              <label className="block font-medium text-gray-700 mb-2">
                Number of Questions
              </label>

              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
              >
                <option value="5">5 Questions</option>
                <option value="10">10 Questions</option>
                <option value="15">15 Questions</option>
                <option value="20">20 Questions</option>
              </select>
            </div>

            {/* Difficulty */}
            <div className="mb-7">
              <label className="block font-medium text-gray-700 mb-3">
                Difficulty
              </label>

              <div className="grid grid-cols-3 gap-3">
                {["Easy", "Medium", "Hard"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`py-3 rounded-xl border text-sm font-medium ${
                      difficulty === level
                        ? "bg-indigo-50 border-indigo-500 text-indigo-600"
                        : "border-gray-200 text-gray-600 hover:border-indigo-300"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Quiz Preview */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-500">Quiz Preview</p>

              <p className="font-semibold text-gray-800 mt-1">
                {questionCount} Questions • {difficulty} Difficulty
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Topics: {topics.map((topic) => topic.topic).join(", ")}
              </p>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:bg-gray-300 transition"
            >
              {generating ? "🤖 Generating Quiz..." : "🤖 Generate Quiz"}
            </button>
          </div>
        )}

        {/* Generated Quiz */}
        {quiz && (
          <div className="max-w-3xl bg-white rounded-2xl border border-gray-100 p-6">
            {/* Quiz Header */}
            <div className="mb-6">
              <p className="text-sm text-indigo-600 font-medium">
                AI Generated Quiz
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-1">
                Test Your Knowledge 🧠
              </h2>

              <p className="text-gray-500 mt-2">
                Select one answer for each question.
              </p>
            </div>

            {/* Questions */}
            <div className="space-y-6">
              {quiz.questions?.map((question, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-5"
                >
                  <p className="font-semibold text-gray-800 mb-4">
                    {index + 1}. {question.question}
                  </p>

                  <div className="space-y-2">
                    {question.options?.map((option, optionIndex) => {
                      const selected = answers[index] === option;

                      return (
                        <button
                          key={optionIndex}
                          onClick={() => handleAnswerSelect(index, option)}
                          className={`w-full text-left p-3 rounded-lg border transition ${
                            selected
                              ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                              : "border-gray-200 hover:border-indigo-400 hover:bg-indigo-50"
                          }`}
                        >
                          <span className="font-medium">
                            {String.fromCharCode(65 + optionIndex)}.
                          </span>{" "}
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Answer Progress */}
            <div className="mt-6 bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">Answered</p>

              <p className="font-semibold text-gray-800 mt-1">
                {Object.keys(answers).length} / {quiz.questions?.length || 0}{" "}
                questions
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitQuiz}
              disabled={submitting}
              className="w-full mt-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:bg-gray-300 transition"
            >
              {submitting ? "Submitting..." : "Submit Quiz ✓"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default GenerateQuiz;
