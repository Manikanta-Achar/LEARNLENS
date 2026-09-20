import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("login");
  const [handleLogin, setHandleLogin] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setAuthUser(null);
        setLoading(false);
        return;
      }

      const response = await api.get("/api/user/check", {
        headers: {
          token,
        },
      });

      if (response.data.success) {
        setAuthUser(response.data.user);
      }
    } catch (error) {
      console.error("Check auth error:", error);
      localStorage.removeItem("token");
      setAuthUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    navigate,
    login,
    setLogin,
    handleLogin,
    setHandleLogin,
    authUser,
    setAuthUser,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
