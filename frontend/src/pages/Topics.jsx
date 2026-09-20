import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

const ImportantTopics = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const materialId = searchParams.get("materialId");

  const [topics, setTopics] = useState([]);
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  const [selectedTopics, setSelectedTopics] = useState([]);

  const getTopics = async () => {
    if (!materialId) {
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`/api/topic/${materialId}`, {
        headers: {
          token: token,
        },
      });

      if (response.data.success) {
        setTopics(response.data.topics);
      }
    } catch (error) {
      console.error("Get topics error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const analyzeTopics = async () => {
    if (!materialId) {
      alert("Material not found.");
      return;
    }

    try {
      setAnalyzing(true);

      const token = localStorage.getItem("token");

      const response = await api.post(
        "/api/topic/analyze",
        {
          materialId: materialId,
        },
        {
          headers: {
            token: token,
          },
        },
      );

      if (response.data.success) {
        setTopics(response.data.topics);
        alert("Important topics generated successfully!");
      }
    } catch (error) {
      console.error(
        "Analyze topics error:",
        error.response?.data || error.message,
      );

      alert(error.response?.data?.message || "Failed to analyze topics");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSelect = (id) => {
    setSelectedTopics((prev) =>
      prev.includes(id)
        ? prev.filter((topicId) => topicId !== id)
        : [...prev, id],
    );
  };

  useEffect(() => {
    getTopics();
  }, [materialId]);
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {" "}
      <Sidebar />{" "}
      <main className="flex-1 p-6 md:p-8">
        {" "}
        {/* Header */}{" "}
        <div className="mb-8">
          {" "}
          <p className="text-sm text-indigo-600 font-medium">
            {" "}
            AI Analysis{" "}
          </p>{" "}
          <h1 className="text-3xl font-bold text-gray-800 mt-1">
            {" "}
            Important Topics ⭐{" "}
          </h1>{" "}
          <p className="text-gray-500 mt-2">
            {" "}
            Select the topics you want to practice.{" "}
          </p>{" "}
        </div>{" "}
        {/* Material */}{" "}
        <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
          {" "}
          <p className="text-sm text-gray-500"> Analyzed Material </p>{" "}
          <h2 className="font-semibold text-gray-800 mt-1">
            {" "}
            {materialId}{" "}
          </h2>{" "}
        </div>{" "}
        {/* Topics */}{" "}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          {" "}
          <div className="flex items-center justify-between mb-5">
            {" "}
            <h2 className="text-lg font-bold text-gray-800">
              {" "}
              AI Identified Topics{" "}
            </h2>{" "}
            <span className="text-sm text-gray-500">
              {" "}
              {selectedTopics.length} selected{" "}
            </span>{" "}
          </div>{" "}
          <div className="space-y-3">
            {loading ? (
              <p className="text-center text-gray-500 py-8">
                Loading topics...
              </p>
            ) : topics.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No topics analyzed yet.</p>

                <button
                  onClick={analyzeTopics}
                  disabled={analyzing}
                  className="mt-4 px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:bg-gray-300"
                >
                  {analyzing ? "🤖 Analyzing..." : "🤖 Analyze Material"}
                </button>
              </div>
            ) : (
              topics.map((topic) => {
                const selected = selectedTopics.includes(topic._id);

                return (
                  <button
                    key={topic._id}
                    onClick={() => handleSelect(topic._id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition ${
                      selected
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-indigo-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center ${
                          selected
                            ? "bg-indigo-600 border-indigo-600 text-white"
                            : "border-gray-300"
                        }`}
                      >
                        {selected && "✓"}
                      </div>

                      <div>
                        <span className="font-medium text-gray-800">
                          {topic.topic}
                        </span>

                        {topic.reason && (
                          <p className="text-xs text-gray-500 mt-1">
                            {topic.reason}
                          </p>
                        )}
                      </div>
                    </div>

                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        topic.importance === "high"
                          ? "bg-red-50 text-red-600"
                          : topic.importance === "medium"
                            ? "bg-yellow-50 text-yellow-600"
                            : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {topic.importance}
                    </span>
                  </button>
                );
              })
            )}
          </div>{" "}
          {/* Generate Quiz */}{" "}
          <div className="flex justify-end mt-6">
            {" "}
            <button
              onClick={() =>
                navigate("/generate-quiz", {
                  state: {
                    materialId,
                    topics: topics.filter((topic) =>
                      selectedTopics.includes(topic._id),
                    ),
                  },
                })
              }
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {" "}
              Generate Quiz →{" "}
            </button>{" "}
          </div>{" "}
        </div>{" "}
      </main>{" "}
    </div>
  );
};
export default ImportantTopics;
