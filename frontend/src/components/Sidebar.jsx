import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: "🏠",
      path: "/home",
    },
    {
      name: "Materials",
      icon: "📄",
      path: "/materials",
    },
    {
      name: "Important Topics",
      icon: "⭐",
      path: "/important-topics",
    },
    {
      name: "Generate Quiz",
      icon: "📝",
      path: "/generate-quiz",
    },
    {
      name: "Quiz Analysis",
      icon: "📊",
      path: "/quiz-analysis",
    },
    {
      name: "Recommendations",
      icon: "🎯",
      path: "/recommendations",
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-100">
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl">
            📖
          </div>

          <div className="text-left">
            <h1 className="text-lg font-bold text-gray-800">LearnLens AI</h1>

            <p className="text-[10px] text-gray-500">
              Learn Smarter • Grow Faster
            </p>
          </div>
        </button>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 px-4 py-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
          Learning
        </p>

        <div className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                }`}
              >
                <span className="text-lg">{item.icon}</span>

                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Account */}
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 mt-8 px-2">
          Account
        </p>

        <button
          onClick={() => navigate("/profile")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
            location.pathname === "/profile"
              ? "bg-indigo-50 text-indigo-600"
              : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
          }`}
        >
          <span className="text-lg">👤</span>
          <span>Profile</span>
        </button>
      </nav>

      {/* Logout */}
      <div className="px-4 py-5 border-t border-gray-100">
        <button
          onClick={() => navigate("/login")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition"
        >
          <span className="text-lg">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
