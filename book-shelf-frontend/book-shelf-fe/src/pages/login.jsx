import { useState } from "react";
import "../css/login.css";
import { LoginRequest } from "../Services/AuthService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTokenStore } from "../zu-store/authStore";

export function Login() {
  const setToken = useTokenStore((state) => state.setToken);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const notifySuccess = () => toast("You are logged in!!!");
  const navigate = useNavigate();
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let responseData = await LoginRequest(form);
      if (responseData.token) {
        notifySuccess();
        localStorage.setItem(
          "access_token",
          `${JSON.stringify(responseData.token)}`
        );
        setToken(responseData.token);
        setForm({ email: "", password: "" });
        navigate("/");
        return;
      }
      if (responseData.status === 400) {
        let resError = responseData.errors;
        if (resError["Email"]) {
          setError(resError?.Email?.join("\n"));
          return;
        }
        if (resError.Password) {
          setError(resError["Password"]);
          return;
        }
      }
      if (responseData.message) {
        setError(responseData.message);
      }

      setForm({ email: "", password: "" });
    } catch (error) {
      console.warn("Login error", error);
      setError("Login failed. Please try again.");
    }
  }
  return (
    <div className="relative flex flex-col justify-center  bg-[rgba(135,206,235,0.4)] border rounded-[15px] shadow-xl max-w-[500px] m-auto mt-20 ">
      {error && (
        <p className="text-red-500 text-sm absolute top-1/12 left-1/2 -translate-x-1/2">
          {error}
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-4  m-auto w-full"
      >
        <div className="flex flex-col item-center justify-center gap-4 mt-10">
          <div className="flex sm:flex">
            <label htmlFor="email" className="">
              Username:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="text-white border border-black placeholder:text-gray-300 placeholder:italic placeholder:text-xs placeholder:font-thin"
              placeholder="Enter Email"
              value={form.email}
              autoComplete="current-username"
              onChange={handleChange}
            />
          </div>
          <div className="relative flex sm:flex items-center">
            <label htmlFor="password">Password:</label>
            <input
              type={!showPassword ? "password" : "text"}
              id="password"
              placeholder="Enter Password"
              name="password"
              value={form.password}
              className="text-white border border-black placeholder:text-gray-300 placeholder:italic placeholder:text-xs placeholder:font-thin"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          //  className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          className="w-auto mx-auto bg-blue-500 py-2 px-10 rounded-[25px] hover:bg-[rgba(233,69,151,0.5)] font-bold transition-all"
        >
          Login
        </button>
      </form>
    </div>
  );
}
