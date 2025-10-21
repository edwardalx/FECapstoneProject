import React from "react";
import { useTokenStore } from "../zu-store/authStore";
import { useNavigate } from "react-router-dom";

export default function PermissionRoute({ children }) {
  const user = useTokenStore((state) => state.user);
  const navigate = useNavigate();
  if (!user.isAdmin) {
    return (
      <div className="flex flex-col items-center my-20 gap-5 font-medium  italic text-purple-300">
        <p>You do not have permissions to access this page.</p>
        <p>Reach-out to system administrator</p>
        <button
          onClick={() => navigate("/")}
          type="button"
          className="bg-yellow-600 not-italic text-black rounded rounded-xl w-20"
        >
          Home
        </button>
      </div>
    );
  }

  return children;
}
