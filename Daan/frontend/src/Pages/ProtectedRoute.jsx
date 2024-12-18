import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const ProtectedRoute = ({ children, reverseProtection = false }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (reverseProtection && isLoggedIn) {
    toast.error("Please log out first to sign up.");
    return <Navigate to="/home" replace />;
  }

  if (!reverseProtection && !isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
