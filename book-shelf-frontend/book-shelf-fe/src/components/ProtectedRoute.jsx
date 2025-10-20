import { Navigate } from "react-router-dom";
import { useTokenStore } from "../zu-store/authStore";
import { toast } from "react-toastify";
import { useEffect } from "react";
export default function PrivateRoute({ children }) {
  const token =
    useTokenStore((state) => state.token) ||
    localStorage.getItem("access_token");

  if (!token) {
    toast("Please login before making payment");
    return <Navigate to="/login" replace />;
  }
  return children;
}
