import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

const Recommendations = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const quizId = location.state?.quizId;

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const generateRecommendations = async () => {
    if (!quizId) {
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        "/api/recommendation/generate",
        {
          quizId: quizId,
        },
        {
          headers: {
            token: token,
          },
        },
      );

      console.log("RECOMMENDATION RESPONSE:", response.data);

      if (response.data.success) {
        setRecommendations(response.data.recommendations || []);
      }
    } catch (error) {
      console.error(
        "Recommendation error:",
        error.response?.data || error.message,
      );

      alert(
        error.response?.data?.message || "Failed to generate recommendations",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateRecommendations();
  }, [quizId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />

        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4">🤖</div>

            <h2 className="text-xl font-bold text-gray-800">
              Generating Recommendations...
            </h2>

            <p className="text-gray-500 mt-2">
              We are analyzing your quiz performance.
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (!quizId) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />

        <main className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center max-w-md">
            <div className="text-4xl mb-4">🎯</div>

            <h2 className="text-xl font-bold text-gray-800">
              No Quiz Selected
            </h2>

            <p className="text-gray-500 mt-2">
              Complete a quiz first to get personalized recommendations.
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-indigo-600 font-medium">
            AI Learning Assistant
          </p>

          <h1 className="text-3xl font-bold text-gray-800 mt-1">
            Recommendations 🎯
          </h1>

          <p className="text-gray-500 mt-2">
            Personalized study suggestions based on your quiz performance.
          </p>
        </div>

        {/* Main Recommendation */}
        <div className="bg-indigo-600 rounded-2xl p-6 md:p-8 text-white mb-8">
          <p className="text-indigo-100 text-sm font-medium">
            AI Learning Recommendation
          </p>

          <h2 className="text-2xl font-bold mt-2">
            Focus on your weaker topics first.
          </h2>

          <p className="text-indigo-100 mt-2 max-w-2xl">
            Review the topics where you made mistakes and take another quiz
            after studying them.
          </p>

          <button
            onClick={() => navigate("/materials")}
            className="mt-5 px-5 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            Review Study Material
          </button>
        </div>

        {/* Recommended Topics */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800">Topics to Study</h2>

          <p className="text-gray-500 text-sm mt-1 mb-5">
            These topics are recommended based on your quiz performance.
          </p>

          {recommendations.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <div className="text-4xl mb-3">🎉</div>

              <h3 className="text-lg font-bold text-gray-800">
                No recommendations available
              </h3>

              <p className="text-gray-500 mt-2">
                You performed well on this quiz. Keep learning and try another
                quiz.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {recommendations.map((item, index) => (
                <div
                  key={item._id || index}
                  className="bg-white rounded-2xl border border-gray-100 p-6"
                >
                  {/* Topic Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg font-bold text-gray-800">
                          {item.topic || "Study Topic"}
                        </h3>

                        <span
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                            item.priority === "high" || item.priority === "High"
                              ? "bg-red-50 text-red-600"
                              : item.priority === "medium" ||
                                  item.priority === "Medium"
                                ? "bg-yellow-50 text-yellow-600"
                                : "bg-green-50 text-green-600"
                          }`}
                        >
                          {item.priority || "Medium"} Priority
                        </span>
                      </div>

                      <p className="text-sm text-gray-500 mt-2">
                        {item.reason ||
                          "Review this topic to improve your understanding."}
                      </p>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="mt-5 bg-gray-50 rounded-xl p-4">
                    <p className="text-sm font-semibold text-gray-700">
                      What to study
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      {item.message ||
                        item.recommendation ||
                        "Review this topic and practice more questions."}
                    </p>
                  </div>

                  {/* Study Button */}
                  <button
                    onClick={() => navigate("/materials")}
                    className="mt-4 px-4 py-2 border border-indigo-200 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-50 transition"
                  >
                    Study This Topic →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Study Plan */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800">
            Suggested Study Plan 📚
          </h2>

          <p className="text-gray-500 text-sm mt-1 mb-6">
            Follow these steps to improve your understanding.
          </p>

          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">
                  Review recommended topics
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Focus on the topics where your quiz performance was lower.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">
                  Practice the concepts
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Read your study material and practice the important concepts
                  again.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">
                  Take another quiz
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Test your understanding after reviewing the topics.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={() => navigate("/materials")}
            className="px-6 py-3 border border-indigo-200 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition"
          >
            Review Materials
          </button>

          <button
            onClick={() => navigate("/generate-quiz")}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Generate New Quiz →
          </button>
        </div>
      </main>
    </div>
  );
};

export default Recommendations;
