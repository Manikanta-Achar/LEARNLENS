import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "📄",
      title: "Upload or Paste",
      description:
        "Upload your study PDF or paste text directly into LearnLens AI.",
    },
    {
      icon: "⭐",
      title: "Find Important Topics",
      description:
        "AI analyzes your material and identifies the most important topics.",
    },
    {
      icon: "📝",
      title: "Generate Quizzes",
      description: "Create quizzes from the topics you want to practice.",
    },
    {
      icon: "📊",
      title: "Analyze Performance",
      description: "Understand your quiz score, strengths, and weak topics.",
    },
    {
      icon: "🎯",
      title: "Get Recommendations",
      description:
        "Receive personalized topic recommendations based on your performance.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl shadow-sm">
              📖
            </div>

            <div className="text-left">
              <h1 className="text-lg font-bold text-gray-800">LearnLens AI</h1>

              <p className="text-[10px] text-gray-500">
                Learn Smarter • Grow Faster
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button onClick={() => navigate("/")} className="text-indigo-600">
              Home
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-gray-600 hover:text-indigo-600 transition"
            >
              Features
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("how-it-works")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-gray-600 hover:text-indigo-600 transition"
            >
              How It Works
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-gray-600 hover:text-indigo-600 transition"
            >
              About
            </button>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
            >
              Log In
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition shadow-sm"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-indigo-50/70 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium mb-6">
                ✨ AI-Powered Learning Assistant
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                Turn Your Study Material Into
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                  Smarter Learning
                </span>
              </h1>

              <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
                Upload your PDF or paste your study text. LearnLens AI
                identifies important topics, generates quizzes, analyzes your
                performance, and recommends what to learn next.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={() => navigate("/signup")}
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:opacity-90 transition shadow-lg"
                >
                  Start Learning Free →
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById("how-it-works")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-7 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition"
                >
                  See How It Works
                </button>
              </div>

              <div className="flex flex-wrap gap-5 mt-7 text-sm text-gray-500">
                <span>✓ PDF Support</span>
                <span>✓ Text Input</span>
                <span>✓ AI Analysis</span>
                <span>✓ Smart Recommendations</span>
              </div>
            </div>

            {/* Hero Dashboard Preview */}
            <div className="relative">
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-indigo-200 rounded-full blur-3xl opacity-50"></div>

              <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-5">
                {/* Fake Browser Header */}
                <div className="flex items-center gap-2 border-b border-gray-100 pb-4 mb-5">
                  <div className="w-3 h-3 rounded-full bg-red-300"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-300"></div>
                  <div className="w-3 h-3 rounded-full bg-green-300"></div>

                  <div className="ml-3 flex-1 h-7 bg-gray-50 rounded-lg"></div>
                </div>

                {/* Preview */}
                <div className="flex gap-4">
                  {/* Mini Sidebar */}
                  <div className="hidden sm:block w-32 bg-gray-50 rounded-xl p-3">
                    <div className="font-bold text-xs text-indigo-600 mb-5">
                      📖 LearnLens
                    </div>

                    <div className="space-y-3 text-[10px] text-gray-500">
                      <div className="text-indigo-600 font-medium">
                        🏠 Dashboard
                      </div>
                      <div>📄 Materials</div>
                      <div>⭐ Topics</div>
                      <div>📝 Quiz</div>
                      <div>📊 Analysis</div>
                      <div>🎯 Recommendations</div>
                    </div>
                  </div>

                  {/* Mini Dashboard */}
                  <div className="flex-1">
                    <p className="text-xs text-indigo-500 font-medium">
                      Welcome back 👋
                    </p>

                    <h3 className="font-bold text-gray-800 mt-1">
                      Your Learning Dashboard
                    </h3>

                    <div className="grid grid-cols-2 gap-3 mt-5">
                      <div className="bg-indigo-50 rounded-xl p-4">
                        <p className="text-[10px] text-gray-500">Materials</p>
                        <p className="text-xl font-bold text-indigo-600">8</p>
                      </div>

                      <div className="bg-yellow-50 rounded-xl p-4">
                        <p className="text-[10px] text-gray-500">Topics</p>
                        <p className="text-xl font-bold text-yellow-600">24</p>
                      </div>

                      <div className="bg-green-50 rounded-xl p-4">
                        <p className="text-[10px] text-gray-500">Quizzes</p>
                        <p className="text-xl font-bold text-green-600">12</p>
                      </div>

                      <div className="bg-purple-50 rounded-xl p-4">
                        <p className="text-[10px] text-gray-500">Score</p>
                        <p className="text-xl font-bold text-purple-600">78%</p>
                      </div>
                    </div>

                    {/* AI Recommendation */}
                    <div className="mt-4 bg-gray-50 rounded-xl p-4">
                      <p className="text-[10px] text-purple-600 font-semibold">
                        🎯 AI RECOMMENDATION
                      </p>

                      <p className="text-sm font-bold text-gray-800 mt-1">
                        Focus on React Hooks
                      </p>

                      <p className="text-[10px] text-gray-500 mt-1">
                        Recommended based on your quiz performance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CORE IDEA ================= */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
            One Platform
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
            From Study Material to Personalized Learning
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            LearnLens AI transforms your existing study material into an
            interactive learning experience.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-2 mt-12">
            <div className="px-5 py-4 bg-indigo-50 rounded-xl">
              <span className="text-xl">📄</span>
              <p className="font-semibold text-gray-800 mt-1">Your Material</p>
            </div>

            <span className="text-2xl text-gray-300">→</span>

            <div className="px-5 py-4 bg-yellow-50 rounded-xl">
              <span className="text-xl">⭐</span>
              <p className="font-semibold text-gray-800 mt-1">
                Important Topics
              </p>
            </div>

            <span className="text-2xl text-gray-300">→</span>

            <div className="px-5 py-4 bg-green-50 rounded-xl">
              <span className="text-xl">📝</span>
              <p className="font-semibold text-gray-800 mt-1">Quiz</p>
            </div>

            <span className="text-2xl text-gray-300">→</span>

            <div className="px-5 py-4 bg-purple-50 rounded-xl">
              <span className="text-xl">📊</span>
              <p className="font-semibold text-gray-800 mt-1">Analysis</p>
            </div>

            <span className="text-2xl text-gray-300">→</span>

            <div className="px-5 py-4 bg-orange-50 rounded-xl">
              <span className="text-xl">🎯</span>
              <p className="font-semibold text-gray-800 mt-1">Recommendation</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
              Features
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              Everything You Need to Learn Better
            </h2>

            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              LearnLens AI helps you understand what to study, practice, and
              improve.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-2xl mb-5">
                  {feature.icon}
                </div>

                <h3 className="font-bold text-gray-800">{feature.title}</h3>

                <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
              How It Works
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              LearnLens AI in 5 Simple Steps
            </h2>
          </div>

          <div className="space-y-5">
            <div className="flex gap-5 items-start p-6 rounded-2xl bg-indigo-50">
              <div className="w-10 h-10 shrink-0 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                1
              </div>

              <div>
                <h3 className="font-bold text-gray-800 text-lg">
                  Upload PDF or Paste Text
                </h3>

                <p className="text-gray-600 mt-1">
                  Provide the study material you want to learn.
                </p>
              </div>
            </div>

            <div className="flex gap-5 items-start p-6 rounded-2xl bg-yellow-50">
              <div className="w-10 h-10 shrink-0 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold">
                2
              </div>

              <div>
                <h3 className="font-bold text-gray-800 text-lg">
                  AI Identifies Important Topics
                </h3>

                <p className="text-gray-600 mt-1">
                  The system analyzes your material and highlights key topics.
                </p>
              </div>
            </div>

            <div className="flex gap-5 items-start p-6 rounded-2xl bg-green-50">
              <div className="w-10 h-10 shrink-0 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                3
              </div>

              <div>
                <h3 className="font-bold text-gray-800 text-lg">
                  Generate a Quiz
                </h3>

                <p className="text-gray-600 mt-1">
                  Select important topics and generate questions for practice.
                </p>
              </div>
            </div>

            <div className="flex gap-5 items-start p-6 rounded-2xl bg-purple-50">
              <div className="w-10 h-10 shrink-0 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                4
              </div>

              <div>
                <h3 className="font-bold text-gray-800 text-lg">
                  Analyze Your Performance
                </h3>

                <p className="text-gray-600 mt-1">
                  See your score and identify strong and weak areas.
                </p>
              </div>
            </div>

            <div className="flex gap-5 items-start p-6 rounded-2xl bg-orange-50">
              <div className="w-10 h-10 shrink-0 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                5
              </div>

              <div>
                <h3 className="font-bold text-gray-800 text-lg">
                  Get Personalized Recommendations
                </h3>

                <p className="text-gray-600 mt-1">
                  LearnLens AI recommends topics that you should focus on next.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
            About LearnLens AI
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
            Your Personal AI Learning Assistant
          </h2>

          <p className="text-gray-600 mt-6 leading-relaxed">
            LearnLens AI is designed to make studying more focused and
            interactive. Instead of simply reading your study material, you can
            analyze it, discover important topics, test your knowledge,
            understand your performance, and receive guidance about what to
            study next.
          </p>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-10 md:p-14 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Learn Smarter?
          </h2>

          <p className="text-indigo-100 mt-4 max-w-xl mx-auto">
            Turn your study material into quizzes, insights, and personalized
            learning recommendations.
          </p>

          <button
            onClick={() => navigate("/signup")}
            className="mt-7 bg-white text-indigo-600 px-7 py-3.5 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            Get Started Free →
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white">
              📖
            </div>

            <span className="font-semibold text-gray-800">LearnLens AI</span>
          </div>

          <p className="text-sm text-gray-500">
            © 2026 LearnLens AI. Learn smarter, grow faster.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
