import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await api.get("/api/user/check", {
        headers: {
          token: token,
        },
      });

      console.log("PROFILE RESPONSE:", response.data);

      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error(
        "Get profile error:",
        error.response?.data || error.message,
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />

        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4">👤</div>

            <h2 className="text-xl font-bold text-gray-800">
              Loading Profile...
            </h2>

            <p className="text-gray-500 mt-2">Please wait.</p>
          </div>
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />

        <main className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <h2 className="text-xl font-bold text-gray-800">
              Profile not found
            </h2>

            <button
              onClick={() => navigate("/login")}
              className="mt-5 px-5 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Go to Login
            </button>
          </div>
        </main>
      </div>
    );
  }

  const userName = user.fullName || "User";
  const userEmail = user.email || "No email";

  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "September 2026";

  const stats = [
    {
      label: "Materials",
      value: "0",
    },
    {
      label: "Topics Studied",
      value: "0",
    },
    {
      label: "Quizzes Taken",
      value: "0",
    },
    {
      label: "Average Score",
      value: "0%",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-indigo-600 font-medium">Account</p>

          <h1 className="text-3xl font-bold text-gray-800 mt-1">
            My Profile 👤
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your account and view your learning progress.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl font-bold text-indigo-600">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>

            {/* User Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{userName}</h2>

              <p className="text-gray-500 mt-1">{userEmail}</p>

              <p className="text-sm text-gray-400 mt-2">Joined {joinedDate}</p>
            </div>
          </div>
        </div>

        {/* Learning Statistics */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Learning Statistics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl border border-gray-100 p-5"
              >
                <p className="text-sm text-gray-500">{stat.label}</p>

                <p className="text-2xl font-bold text-indigo-600 mt-2">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800">Account Settings</h2>

          <p className="text-sm text-gray-500 mt-1 mb-6">
            Manage your account information.
          </p>

          <div className="space-y-5 max-w-xl">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                value={userName}
                readOnly
                className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-600 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                value={userEmail}
                readOnly
                className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-600 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/home")}
            className="px-5 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Back to Dashboard
          </button>

          <button
            onClick={handleLogout}
            className="px-5 py-3 border border-red-200 text-red-500 rounded-xl font-semibold hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>
      </main>
    </div>
  );
};

export default Profile;
