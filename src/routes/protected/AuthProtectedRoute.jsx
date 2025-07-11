import React from "react";
import { Navigate } from "react-router-dom";

const AuthProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authUser"); // or use context
  return token ? children : <Navigate to="/" replace />;
};

export default AuthProtectedRoute;
