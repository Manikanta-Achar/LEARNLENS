import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

const QuizAnalysis = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const quizId = location.state?.quizId;

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const getQuizResult = async () => {
    if (!quizId) {
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`/api/quiz/result/${quizId}`, {
        headers: {
          token: token,
        },
      });

      console.log("QUIZ RESULT:", response.data);

      if (response.data.success) {
        setResult(response.data.result);
      }
    } catch (error) {
      console.error(
        "Get quiz result error:",
        error.response?.data || error.message,
      );

      alert(error.response?.data?.message || "Failed to load quiz result");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuizResult();
  }, [quizId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />

        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">
              Loading quiz analysis...
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Please wait while we analyze your performance.
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (!quizId || !result) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />

        <main className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center max-w-md">
            <h2 className="text-xl font-bold text-gray-800">
              Quiz Result Not Found
            </h2>

            <p className="text-gray-500 mt-2">
              Please complete a quiz first to view your analysis.
            </p>

            <button
              onClick={() => navigate("/generate-quiz")}
              className="mt-5 px-5 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Generate Quiz
            </button>
          </div>
        </main>
      </div>
    );
  }

  const totalQuestions = result.totalQuestions || 0;
  const correctAnswers = result.correctAnswers || 0;
  const wrongAnswers = result.wrongAnswers || 0;
  const score = result.score || 0;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-indigo-600 font-medium">Quiz Results</p>

          <h1 className="text-3xl font-bold text-gray-800 mt-1">
            Quiz Analysis 📊
          </h1>

          <p className="text-gray-500 mt-2">
            Understand your performance and identify topics that need more
            practice.
          </p>
        </div>

        {/* Score Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          {/* Score */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <p className="text-sm text-gray-500">Score</p>

            <h2 className="text-3xl font-bold text-indigo-600 mt-2">
              {score}%
            </h2>
          </div>

          {/* Total Questions */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <p className="text-sm text-gray-500">Total Questions</p>

            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              {totalQuestions}
            </h2>
          </div>

          {/* Correct Answers */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <p className="text-sm text-gray-500">Correct Answers</p>

            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {correctAnswers}
            </h2>
          </div>

          {/* Wrong Answers */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <p className="text-sm text-gray-500">Wrong Answers</p>

            <h2 className="text-3xl font-bold text-red-500 mt-2">
              {wrongAnswers}
            </h2>
          </div>
        </div>

        {/* Overall Performance */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800">
            Overall Performance
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Your performance in the latest quiz.
          </p>

          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Quiz Score</span>

              <span className="font-semibold text-gray-800">{score}%</span>
            </div>

            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all"
                style={{
                  width: `${score}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Topic Performance */}
        {result.topicPerformance && result.topicPerformance.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800">
              Topic-wise Performance
            </h2>

            <p className="text-gray-500 text-sm mt-1 mb-6">
              See how you performed in each topic.
            </p>

            <div className="space-y-5">
              {result.topicPerformance.map((topic, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-medium text-gray-800">{topic.topic}</p>

                      <p className="text-xs text-gray-500 mt-1">
                        {topic.correct} / {topic.total} correct
                      </p>
                    </div>

                    <span className="text-sm font-semibold text-gray-700">
                      {topic.percentage}%
                    </span>
                  </div>

                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all"
                      style={{
                        width: `${topic.percentage}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Weak Topics */}
        {result.weakTopics && result.weakTopics.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800">
              Topics to Improve 🎯
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              These topics need more practice based on your quiz performance.
            </p>

            <div className="flex flex-wrap gap-3 mt-5">
              {result.weakTopics.map((topic, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium"
                >
                  {typeof topic === "string" ? topic : topic.topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Recommendation */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="font-bold text-gray-800">
              Want to improve your score?
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Get recommendations based on your quiz performance.
            </p>
          </div>

          <button
            onClick={() =>
              navigate("/recommendations", {
                state: {
                  quizId: quizId,
                  score: score,
                  weakTopics: result.weakTopics || [],
                },
              })
            }
            className="px-5 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            View Recommendations →
          </button>
        </div>
      </main>
    </div>
  );
};

export default QuizAnalysis;
