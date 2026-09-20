import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

const Dashboard = () => {
  const { authUser, loading: authLoading } = useContext(AuthContext);

  const navigate = useNavigate();

  const [materials, setMaterials] = useState([]);
  const [loadingMaterials, setLoadingMaterials] = useState(true);

  const [topicCount, setTopicCount] = useState(0);

  const [quizCount, setQuizCount] = useState(0);
  const [averageScore, setAverageScore] = useState(0);

  const getMaterials = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await api.get("/api/material/all", {
        headers: {
          token: token,
        },
      });

      console.log("MATERIALS:", response.data);

      if (response.data.success) {
        setMaterials(response.data.materials || []);
      }
    } catch (error) {
      console.error(
        "Get materials error:",
        error.response?.data || error.message,
      );
    } finally {
      setLoadingMaterials(false);
    }
  };

  const getTopicCount = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      /*
        Get topics from all analyzed materials.
      */
      let totalTopics = 0;

      for (const material of materials) {
        try {
          const response = await api.get(`/api/topic/${material._id}`, {
            headers: {
              token: token,
            },
          });

          if (response.data.success) {
            totalTopics += response.data.topics?.length || 0;
          }
        } catch (error) {
          console.error(
            `Topic error for ${material._id}:`,
            error.response?.data || error.message,
          );
        }
      }

      setTopicCount(totalTopics);
    } catch (error) {
      console.error(
        "Get topic count error:",
        error.response?.data || error.message,
      );
    }
  };

  /*
    Currently there is no GET /api/quiz/all endpoint
    in the backend structure we created.

    Therefore we keep these as 0 instead of showing
    fake statistics.
  */
  const getQuizStats = async () => {
    setQuizCount(0);
    setAverageScore(0);
  };

  useEffect(() => {
    if (!authLoading) {
      if (!authUser) {
        navigate("/login");
        return;
      }

      getMaterials();
      getQuizStats();
    }
  }, [authLoading, authUser]);

  useEffect(() => {
    if (materials.length > 0) {
      getTopicCount();
    } else {
      setTopicCount(0);
    }
  }, [materials]);

  if (authLoading || loadingMaterials) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />

        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4">📚</div>

            <h2 className="text-xl font-bold text-gray-800">
              Loading Dashboard...
            </h2>

            <p className="text-gray-500 mt-2">Please wait.</p>
          </div>
        </main>
      </div>
    );
  }

  /*
    Latest two materials
  */
  const recentMaterials = [...materials]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-indigo-600 font-medium mb-1">
              Welcome back, {authUser?.fullName || "Learner"} 👋
            </p>

            <h1 className="text-3xl font-bold text-gray-800">
              Learn Smarter with LearnLens AI
            </h1>

            <p className="text-gray-500 mt-2">
              Upload your study material and let AI help you learn better.
            </p>
          </div>

          <button
            onClick={() => navigate("/materials")}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition shadow-md"
          >
            + Add Material
          </button>
        </div>

        {/* Main Action */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 md:p-8 text-white mb-8">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
              ✨ AI-Powered Learning
            </span>

            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Turn your study material into smarter learning
            </h2>

            <p className="text-indigo-100 mb-6">
              Upload a PDF or paste your study text. LearnLens AI will identify
              important topics, generate quizzes, analyze your performance, and
              recommend what to study next.
            </p>

            <button
              onClick={() => navigate("/materials")}
              className="bg-white text-indigo-600 px-5 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Upload Material →
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Materials */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Materials</p>

                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {materials.length}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-xl">
                📄
              </div>
            </div>
          </div>

          {/* Topics */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Topics Found</p>

                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {topicCount}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-yellow-50 flex items-center justify-center text-xl">
                ⭐
              </div>
            </div>
          </div>

          {/* Quizzes */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Quizzes Taken</p>

                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {quizCount}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center text-xl">
                📝
              </div>
            </div>
          </div>

          {/* Average Score */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Average Score</p>

                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {averageScore}%
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center text-xl">
                📊
              </div>
            </div>
          </div>
        </div>

        {/* Learning Workflow */}
        <div className="mb-8">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-800">
              Your Learning Workflow
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Follow the steps to turn your material into personalized learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Step 1 */}
            <button
              onClick={() => navigate("/materials")}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-left hover:shadow-md hover:-translate-y-1 transition"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-2xl mb-4">
                📄
              </div>

              <p className="text-xs font-semibold text-indigo-500 mb-1">
                STEP 01
              </p>

              <h3 className="font-bold text-gray-800 text-lg">Add Material</h3>

              <p className="text-sm text-gray-500 mt-2">
                Upload a PDF or paste your study text.
              </p>
            </button>

            {/* Step 2 */}
            <button
              onClick={() => navigate("/important-topics")}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-left hover:shadow-md hover:-translate-y-1 transition"
            >
              <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center text-2xl mb-4">
                ⭐
              </div>

              <p className="text-xs font-semibold text-yellow-600 mb-1">
                STEP 02
              </p>

              <h3 className="font-bold text-gray-800 text-lg">
                Find Important Topics
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                AI identifies the key topics from your material.
              </p>
            </button>

            {/* Step 3 */}
            <button
              onClick={() => navigate("/generate-quiz")}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-left hover:shadow-md hover:-translate-y-1 transition"
            >
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-2xl mb-4">
                📝
              </div>

              <p className="text-xs font-semibold text-green-600 mb-1">
                STEP 03
              </p>

              <h3 className="font-bold text-gray-800 text-lg">Generate Quiz</h3>

              <p className="text-sm text-gray-500 mt-2">
                Create a quiz based on selected topics.
              </p>
            </button>

            {/* Step 4 */}
            <button
              onClick={() => navigate("/recommendations")}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-left hover:shadow-md hover:-translate-y-1 transition"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-2xl mb-4">
                🎯
              </div>

              <p className="text-xs font-semibold text-purple-600 mb-1">
                STEP 04
              </p>

              <h3 className="font-bold text-gray-800 text-lg">
                Get Recommendations
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Get recommendations based on your performance.
              </p>
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Materials */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Recent Materials
                </h2>

                <p className="text-sm text-gray-500">
                  Your recently added study material
                </p>
              </div>

              <button
                onClick={() => navigate("/materials")}
                className="text-sm text-indigo-600 font-medium hover:underline"
              >
                View All
              </button>
            </div>

            {recentMaterials.length === 0 ? (
              <div className="py-8 text-center">
                <div className="text-4xl mb-3">📚</div>

                <h3 className="font-semibold text-gray-800">
                  No materials yet
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Add your first study material to get started.
                </p>

                <button
                  onClick={() => navigate("/materials")}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
                >
                  Add Material
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {recentMaterials.map((material) => (
                  <div
                    key={material._id}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50"
                  >
                    <div className="w-11 h-11 rounded-lg bg-red-50 flex items-center justify-center text-xl flex-shrink-0">
                      📕
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-800 truncate">
                        {material.title}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        {material.type === "pdf" ? "PDF" : "Text"} •{" "}
                        {material.status === "analyzed" ? "Analyzed" : "Ready"}
                      </p>
                    </div>

                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        material.status === "analyzed"
                          ? "bg-green-50 text-green-600"
                          : "bg-yellow-50 text-yellow-600"
                      }`}
                    >
                      {material.status === "analyzed" ? "Ready" : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Recommendation */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center text-xl">
                🎯
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  AI Recommendation
                </h2>

                <p className="text-sm text-gray-500">
                  Based on your recent quiz performance
                </p>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-5">
              <p className="text-sm text-purple-700 font-medium">
                Learning Assistant
              </p>

              <h3 className="text-xl font-bold text-gray-800 mt-1">
                Ready to learn?
              </h3>

              <p className="text-sm text-gray-600 mt-2">
                Complete a quiz to receive personalized recommendations about
                which topics you should study next.
              </p>

              <button
                onClick={() => navigate("/generate-quiz")}
                className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition"
              >
                Generate Quiz →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
