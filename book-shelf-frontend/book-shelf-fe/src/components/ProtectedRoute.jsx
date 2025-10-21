import { useNavigate } from "react-router-dom";
import { useTokenStore } from "../zu-store/authStore";
import { toast } from "react-toastify";
import { useEffect } from "react";
export default function PrivateRoute({ children }) {
  const token =
    useTokenStore((state) => state.token) ||
    localStorage.getItem("access_token");
  const navigate = useNavigate();

  if (!token) {
    toast("Please login before accessing this page");
    return (
      <div>
        <div className="flex flex-col justify-center items-center p-10 gap-5 my-10 font-medium italic">
          <h1>To access this page, you have to login</h1>
          <p>Click the button below to login</p>
          <button
            className="bg-yellow-600 border rounded-xl w-20 not-italic"
            onClick={() => navigate("/login")}
            type="button"
          >
            Login
          </button>
        </div>
      </div>
    );
  }
  return children;
}
