import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const Navbar = () => {
  const { navigate, setLogin } = useContext(AuthContext);

  const handlebtn = () => {
    navigate("/login");
    setLogin("signup");
  };

  const handleLog = () => {
    navigate("/login");
    setLogin("login");
  };

  return (
    <nav className="w-full px-6 md:px-10 lg:px-16 py-5 bg-white border-b border-gray-100">
      {" "}
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {" "}
        {/* Logo */}{" "}
        <a href="/" className="flex items-center gap-3">
          {" "}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#7c3aed] flex items-center justify-center text-xl">
            {" "}
            📖{" "}
          </div>{" "}
          <div>
            {" "}
            <h1 className="text-2xl font-bold text-[#172554] leading-none">
              {" "}
              LearnLens <span className="text-[#635bff]">AI</span>{" "}
            </h1>{" "}
            <p className="text-xs text-gray-500 mt-1">
              {" "}
              Learn Smarter • Grow Faster{" "}
            </p>{" "}
          </div>{" "}
        </a>{" "}
        {/* Navigation Links */}{" "}
        <div className="hidden md:flex items-center gap-8">
          {" "}
          <a
            href="/"
            className="text-[#172554] font-medium hover:text-[#635bff] transition"
          >
            {" "}
            Home{" "}
          </a>{" "}
          <a
            href="/features"
            className="text-gray-600 font-medium hover:text-[#635bff] transition"
          >
            {" "}
            Features{" "}
          </a>{" "}
          <a
            href="/about"
            className="text-gray-600 font-medium hover:text-[#635bff] transition"
          >
            {" "}
            About{" "}
          </a>{" "}
          <a
            href="/contact"
            className="text-gray-600 font-medium hover:text-[#635bff] transition"
          >
            {" "}
            Contact{" "}
          </a>{" "}
        </div>{" "}
        {/* Auth Buttons */}{" "}
        <div className="hidden md:flex items-center gap-3">
          {" "}
          <a
            onClick={handleLog}
            className="px-5 py-2.5 rounded-lg text-[#635bff] font-semibold hover:bg-[#f5f3ff] transition"
          >
            {" "}
            Log In{" "}
          </a>{" "}
          <a
            onClick={handlebtn}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#7c3aed] text-white font-semibold hover:opacity-90 transition shadow-md shadow-purple-200"
          >
            {" "}
            Get Started{" "}
          </a>{" "}
        </div>{" "}
        {/* Mobile Menu Button */}{" "}
        <button className="md:hidden text-2xl text-[#172554]"> ☰ </button>{" "}
      </div>{" "}
    </nav>
  );
};
export default Navbar;
