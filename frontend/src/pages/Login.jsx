import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

const Login = () => {
  const { navigate, login, setLogin, setHandleLogin } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (login === "login") {
        const response = await api.post("/api/user/login", { email, password });
        if (response.data.success) {
          navigate("/home");
          localStorage.setItem("token", response.data.token);
          setHandleLogin(response.data.token);
          alert("Login successful");
        }
      } else {
        const response = await api.post("/api/user/signup", {
          fullName,
          email,
          password,
        });
        if (response.data.success) {
          navigate("/home");
          localStorage.setItem("token", response.data.token);
          setHandleLogin(response.data.token);
          alert("Signup successful");
        }
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#f5f3ff] via-[#eef4ff] to-[#e5efff] px-16 py-12 flex-col justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="text-5xl">📖</div>

          <div>
            <h1 className="text-4xl font-bold text-[#172554]">
              LearnLens <span className="text-[#635bff]">AI</span>
            </h1>

            <p className="text-[#64748b] text-lg">
              Learn Smarter • Grow Faster
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-xl">
          <h2 className="text-5xl font-bold leading-tight text-[#172554]">
            Your Personal <span className="text-[#635bff]">AI</span>
            <br />
            <span className="text-[#635bff]">Learning</span> Companion
          </h2>

          <p className="text-[#64748b] text-lg leading-8 mt-7">
            Get personalized study plans, understand concepts better, and
            achieve your goals with the power of AI.
          </p>

          {/* Features */}
          <div className="mt-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/70 flex items-center justify-center text-2xl">
                ✨
              </div>

              <div>
                <h3 className="font-semibold text-[#172554] text-lg">
                  Personalized Learning
                </h3>
                <p className="text-gray-500">Tailored plans for your goals</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/70 flex items-center justify-center text-2xl">
                🧠
              </div>

              <div>
                <h3 className="font-semibold text-[#172554] text-lg">
                  AI-Powered Explanations
                </h3>
                <p className="text-gray-500">Understand concepts easily</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/70 flex items-center justify-center text-2xl">
                📊
              </div>

              <div>
                <h3 className="font-semibold text-[#172554] text-lg">
                  Track Your Progress
                </h3>
                <p className="text-gray-500">Stay consistent, achieve more</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Illustration */}
        <div className="flex items-end justify-center gap-5 text-6xl">
          📚 💻 🌱
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 px-6 sm:px-12 lg:px-20 py-8">
        {/* Sign Up */}
        {login === "login" ? (
          <div className="flex justify-end">
            <p className="text-gray-500">
              Don't have an account?{" "}
              <button
                onClick={() => setLogin("signup")}
                className="font-semibold text-[#635bff]"
              >
                Sign Up
              </button>
            </p>
          </div>
        ) : (
          <div className="flex justify-end">
            <p className="text-gray-500">
              Already have an account?{" "}
              <button
                onClick={() => setLogin("login")}
                className="font-semibold text-[#635bff]"
              >
                Log In
              </button>
            </p>
          </div>
        )}

        {/* Login Form */}
        <div className="max-w-xl mx-auto mt-20">
          {login === "login" ? (
            <h2 className="text-4xl font-bold text-[#172554]">
              Welcome Back 👋
            </h2>
          ) : (
            <h2 className="text-4xl font-bold text-[#172554]">
              Create Your Account 🚀
            </h2>
          )}

          {login === "login" ? (
            <p className="text-gray-500 text-lg mt-4 leading-7">
              Log in to your LearnLens AI account and
              <br />
              continue your learning journey.
            </p>
          ) : (
            <p className="text-gray-500 text-lg mt-4 leading-7">
              Join LearnLens AI and start learning smarter
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            {/* Name */}
            {login !== "login" ? (
              <div>
                <label className="block font-semibold text-[#172554] mb-2">
                  Full Name
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2">
                    👤
                  </span>

                  <input
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                    type="text"
                    placeholder="Enter your fullName"
                    className="w-full h-14 pl-12 pr-4 border border-gray-300 rounded-xl outline-none focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/20"
                    required
                  />
                </div>
              </div>
            ) : (
              ""
            )}

            {/* Email */}
            <div>
              <label className="block font-semibold text-[#172554] mb-2">
                Email Address
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                  ✉️
                </span>

                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-14 pl-12 pr-4 border border-gray-300 rounded-xl outline-none focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/20"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block font-semibold text-[#172554] mb-2">
                Password
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                  🔒
                </span>

                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full h-14 pl-12 pr-12 border border-gray-300 rounded-xl outline-none focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/20"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              {login === "login" ? (
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="w-5 h-5 accent-[#635bff]" />
                  Remember me
                </label>
              ) : (
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="w-5 h-5 accent-[#635bff]" />
                  I agree to the Terms of Service and Privacy Policy.
                </label>
              )}

              {login === "login" && (
                <button type="button" className="text-[#635bff] font-semibold">
                  Forgot password?
                </button>
              )}
            </div>

            {/* Login */}
            {login === "login" ? (
              <button
                type="submit"
                className="w-full h-14 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#7c3aed] text-white text-lg font-semibold hover:opacity-90 transition"
              >
                Log In →
              </button>
            ) : (
              <button
                type="submit"
                className="w-full h-14 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#7c3aed] text-white text-lg font-semibold hover:opacity-90 transition"
              >
                Create Account
              </button>
            )}

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Google */}
            <button
              type="button"
              className="w-full h-14 border border-gray-300 rounded-xl flex items-center justify-center gap-3 font-semibold text-[#172554] hover:bg-gray-50"
            >
              <span className="text-xl">G</span>
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
