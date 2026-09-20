import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

const Materials = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState("upload");
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState("");
  const [materialName, setMaterialName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [loadingMaterials, setLoadingMaterials] = useState(true);

  // Dummy materials
  // const [materials] = useState([
  //   {
  //     id: 1,
  //     name: "Database Management.pdf",
  //     type: "PDF",
  //     size: "2.4 MB",
  //     status: "Analyzed",
  //   },
  //   {
  //     id: 2,
  //     name: "Machine Learning Notes.pdf",
  //     type: "PDF",
  //     size: "1.8 MB",
  //     status: "Analyzed",
  //   },
  //   {
  //     id: 3,
  //     name: "React Hooks Notes",
  //     type: "Text",
  //     size: "5 KB",
  //     status: "Analyzed",
  //   },
  // ]);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    setSelectedFile(file);

    if (!materialName) {
      setMaterialName(file.name.replace(".pdf", ""));
    }
  };

  // Analyze material
  const handleAnalyze = () => {
    if (activeTab === "text") {
      addTextMaterial();
      return;
    }

    if (activeTab === "upload") {
      addPdfMaterial();
    }
  };

  const getMaterials = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/api/material/all", {
        headers: { token: token },
      });
      if (response.data.success) {
        setMaterials(response.data.materials);
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

  const addTextMaterial = async () => {
    if (!materialName.trim()) {
      alert("Please enter material title.");
      return;
    }
    if (!text.trim()) {
      alert("Please paste your study material.");
      return;
    }
    try {
      setIsAnalyzing(true);
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/api/material/text",
        { title: materialName, content: text },
        { headers: { token: token } },
      );
      if (response.data.success) {
        alert("Material added successfully!");
        setMaterialName("");
        setText("");
        await getMaterials();
      }
    } catch (error) {
      console.error(
        "Add text material error:",
        error.response?.data || error.message,
      );
      alert(error.response?.data?.message || "Failed to add material");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const addPdfMaterial = async () => {
    if (!selectedFile) {
      alert("Please upload a PDF first.");
      return;
    }

    try {
      setIsAnalyzing(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("title", materialName || selectedFile.name);
      formData.append("file", selectedFile);

      const response = await api.post("/api/material/pdf", formData, {
        headers: {
          token: token,
        },
      });

      if (response.data.success) {
        alert("PDF uploaded successfully!");

        setSelectedFile(null);
        setMaterialName("");

        await getMaterials();
      }
    } catch (error) {
      console.error("Add PDF error:", error.response?.data || error.message);

      alert(error.response?.data?.message || "Failed to upload PDF");
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    getMaterials();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-indigo-600 font-medium">
            Learning Materials
          </p>

          <h1 className="text-3xl font-bold text-gray-800 mt-1">
            Add Your Study Material 📚
          </h1>

          <p className="text-gray-500 mt-2">
            Upload a PDF or paste your study text to let AI analyze it.
          </p>
        </div>

        {/* Main Upload Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab("upload")}
              className={`flex-1 py-4 text-sm font-medium transition ${
                activeTab === "upload"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              📄 Upload PDF
            </button>

            <button
              onClick={() => setActiveTab("text")}
              className={`flex-1 py-4 text-sm font-medium transition ${
                activeTab === "text"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              📝 Paste Text
            </button>
          </div>

          <div className="p-6 md:p-8">
            {/* ================= UPLOAD PDF ================= */}
            {activeTab === "upload" && (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {!selectedFile ? (
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="w-full border-2 border-dashed border-gray-200 rounded-2xl p-10 md:p-14 hover:border-indigo-400 hover:bg-indigo-50/30 transition"
                  >
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 flex items-center justify-center text-3xl">
                      📄
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800 mt-5">
                      Upload your PDF
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      Click here to select your study material
                    </p>

                    <p className="text-xs text-gray-400 mt-3">
                      Supported format: PDF
                    </p>
                  </button>
                ) : (
                  <div className="border border-indigo-100 bg-indigo-50/40 rounded-2xl p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center text-2xl">
                        📕
                      </div>

                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          {selectedFile.name}
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>

                      <button
                        onClick={() => setSelectedFile(null)}
                        className="text-sm text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ================= PASTE TEXT ================= */}
            {activeTab === "text" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Material Title
                </label>

                <input
                  type="text"
                  value={materialName}
                  onChange={(e) => setMaterialName(e.target.value)}
                  placeholder="Example: JavaScript Fundamentals"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 mb-5"
                />

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paste your study material
                </label>

                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your notes, textbook content, lecture notes, or study material here..."
                  rows={12}
                  className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none resize-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400"
                />

                <div className="flex justify-between mt-2">
                  <p className="text-xs text-gray-400">
                    AI will analyze this content and identify important topics.
                  </p>

                  <p className="text-xs text-gray-400">
                    {text.length} characters
                  </p>
                </div>
              </div>
            )}

            {/* Material Name for PDF */}
            {activeTab === "upload" && selectedFile && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Material Name
                </label>

                <input
                  type="text"
                  value={materialName}
                  onChange={(e) => setMaterialName(e.target.value)}
                  placeholder="Enter material name"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400"
                />
              </div>
            )}

            {/* Analyze Button */}
            <div className="mt-7 flex justify-end">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-60"
              >
                {isAnalyzing ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Analyzing...
                  </span>
                ) : (
                  "🤖 Analyze Material"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* AI Process Info */}
        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-6">
          <div className="flex gap-4">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-white flex items-center justify-center text-2xl shadow-sm">
              🤖
            </div>

            <div>
              <h2 className="font-bold text-gray-800">
                What happens after analysis?
              </h2>

              <p className="text-sm text-gray-600 mt-1">
                LearnLens AI processes your material and identifies the
                important topics. You can then select topics and generate a
                personalized quiz.
              </p>

              <div className="flex flex-wrap gap-3 mt-4">
                <span className="px-3 py-1.5 bg-white rounded-lg text-xs text-gray-600">
                  📄 Extract Content
                </span>

                <span className="px-3 py-1.5 bg-white rounded-lg text-xs text-gray-600">
                  ⭐ Find Topics
                </span>

                <span className="px-3 py-1.5 bg-white rounded-lg text-xs text-gray-600">
                  📝 Generate Quiz
                </span>

                <span className="px-3 py-1.5 bg-white rounded-lg text-xs text-gray-600">
                  🎯 Recommend
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Materials */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Your Materials
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Previously analyzed study materials
              </p>
            </div>

            <span className="text-sm text-gray-500">
              {materials.length} materials
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {materials.map((material) => (
              <div
                key={material._id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-2xl">
                    {material.type === "PDF" ? "📕" : "📝"}
                  </div>

                  <span className="text-xs px-3 py-1 rounded-full bg-green-50 text-green-600">
                    {material.status}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-800 mt-5 truncate">
                  {material.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {material.type} • {material.size}
                </p>

                <button
                  onClick={() =>
                    navigate(`/important-topics?materialId=${material._id}`)
                  }
                  className="w-full mt-5 py-2.5 rounded-lg bg-gray-50 text-indigo-600 text-sm font-medium hover:bg-indigo-50 transition"
                >
                  View Topics →
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Materials;
