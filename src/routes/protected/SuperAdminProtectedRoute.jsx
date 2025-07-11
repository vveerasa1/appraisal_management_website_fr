import React from "react";
import { Navigate } from "react-router-dom";

const SuperAdminProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("authUser"));

  console.log(user, "User Role");
  if (!user) return <Navigate to="/" replace />;
  if (user.role === "Super Admin") {
    return children;
  } else {
    return <Navigate to="/dashboard" replace />;
  }
};

export default SuperAdminProtectedRoute;
