import { useState } from "react";
import "../css/login.css";
import { LoginRequest } from "../Services/AuthService";

export function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // if (form.email.trim().length <= 2) {
    //   setError("Please enter a valid email");
    //   return;
    // }
    // if (!form.password) {
    //   setError("Please enter a valid password");
    //   return;
    // }
    try {
      let responseData = await LoginRequest(form);
      if (responseData.token) {
        console.log(
          "After login will set in local storage: ",
          responseData.token
        );
        setForm({ email: "", password: "" });
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
        className="flex flex-col items-center justify-center gap-4  m-auto"
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
              className="text-white border border-black"
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
              className="border border-black text-white pr-10 flex-1"
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
          className="bg-[rgba(233,69,151,0.712)] w-[80px] h-8 rounded-[25px] hover:bg-[rgba(233,69,151,0.5)] font-bold "
        >
          Login
        </button>
      </form>
    </div>
  );
}
