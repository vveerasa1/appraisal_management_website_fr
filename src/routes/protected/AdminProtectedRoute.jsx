import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("authUser"));

  console.log(user, "User Role");
  if (!user) return <Navigate to="/" replace />;
  if (!(userRole === "Super Admin" || userRole === "Admin"))
    return <Navigate to="/unauthorized" replace />;

  return children;
};

export default AdminProtectedRoute;
