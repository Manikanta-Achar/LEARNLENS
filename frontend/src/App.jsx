import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import Materials from "./pages/StudyMaterial";
import ImportantTopics from "./pages/Topics";
import GenerateQuiz from "./pages/Quiz";
import QuizAnalysis from "./pages/QuizAnalysis";
import Recommendations from "./pages/Recomdation";
import Profile from "./pages/Profile";

const App = () => {
  const { handleLogin } = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={handleLogin !== null ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={handleLogin === null ? <Login /> : <Navigate to={"/home"} />}
        />
        <Route
          path="/signup"
          element={handleLogin === null ? <Login /> : <Navigate to={"/home"} />}
        />
        <Route
          path="/materials"
          element={
            handleLogin !== null ? <Materials /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/important-topics"
          element={
            handleLogin !== null ? (
              <ImportantTopics />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/generate-quiz"
          element={
            handleLogin !== null ? <GenerateQuiz /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/quiz-analysis"
          element={
            handleLogin !== null ? <QuizAnalysis /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/recommendations"
          element={
            handleLogin !== null ? (
              <Recommendations />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/profile"
          element={
            handleLogin !== null ? <Profile /> : <Navigate to={"/login"} />
          }
        />
      </Routes>
    </>
  );
};

export default App;
