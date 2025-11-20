import { useState } from "react";
import "../css/login.css";
import { LoginRequest } from "../Services/AuthService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTokenStore } from "../zu-store/authStore";

export function Login() {
  const setToken = useTokenStore((state)=>(state.setToken))
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
        setToken(responseData.token)
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
    <div className="relative flex flex-col justify-center bg-[rgba(135,206,235,0.4)] border rounded-[15px] shadow-xl w-11/12 max-w-md sm:max-w-md lg:max-w-lg m-auto mt-16 px-4 py-6">
      {error && (
        <p className="text-red-500 text-sm absolute top-4 left-1/2 -translate-x-1/2">
          {error}
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-4  m-auto w-full"
      >
        <div className="flex flex-col items-center justify-center gap-4 mt-2 w-full">
          <div className="flex flex-col sm:flex-row w-full items-center gap-2">
            <label htmlFor="email" className="w-full sm:w-auto">
              Username:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="text-white border border-black flex-1 rounded px-2 py-1"
              placeholder="Enter Email"
              value={form.email}
              autoComplete="current-username"
              onChange={handleChange}
            />
          </div>
          <div className="relative flex flex-col sm:flex-row items-center w-full gap-2">
            <label htmlFor="password" className="w-full sm:w-auto">Password:</label>
            <input
              type={!showPassword ? "password" : "text"}
              id="password"
              placeholder="Enter Password"
              name="password"
              value={form.password}
              className="border border-black text-white pr-10 flex-1 rounded px-2 py-1"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 sm:static sm:ml-2"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="bg-[rgba(233,69,151,0.712)] w-28 h-8 rounded-[25px] hover:bg-[rgba(233,69,151,0.5)] font-bold "
        >
          Login
        </button>
      </form>
    </div>
  );
}
