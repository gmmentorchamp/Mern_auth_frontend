// src/pages/Auth.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { setAuthToken } from "../utils/api";
import toast from "react-hot-toast";

export default function Auth() {
  const navigate = useNavigate();

  const [state, setState] = useState("Login"); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // <- REQUIRED


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!email || !password) {
      setMsg("Please enter email and password.");
      return;
    }
    setLoading(true);

    try {
      if (state === "Login") {
        const res = await API.post("/auth/login", { email, password });
        const { token } = res.data;
        localStorage.setItem("token", token);
        setAuthToken(token);
        toast.success("Login Successful ✅");
        navigate("/paid");
      } else {
        // Sign Up
        const res = await API.post("/auth/register", { email, password });
        toast.success("Account Created Successfully 🎉");
        setState("Login");
        setPassword("");
      }
    } catch (err) {
  toast.error(err.response?.data?.message || "Something went wrong ❌"); // error toast
    } finally {
      setLoading(false);
    }
  };

  // Icon components
  const MailIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80">
      <path d="M3 7.5v9A2.5 2.5 0 0 0 5.5 19h13A2.5 2.5 0 0 0 21 16.5v-9" stroke="#c7d2fe" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 7.5L12 13 3 7.5" stroke="#c7d2fe" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const LockIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80">
      <rect x="3" y="11" width="18" height="10" rx="2" stroke="#c7d2fe" strokeWidth="1.4"/>
      <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="#c7d2fe" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );

  return (

  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-300 to-teal-500 px-4">
    <div className="bg-white w-full max-w-md p-10 rounded-xl shadow-xl">
      <h2 className="text-3xl font-semibold text-center text-teal-700 mb-8">
        {state === "Login" ? "Login" : "Sign Up"}
      </h2>

      {msg && (
        <p className="text-center text-red-500 mb-4 text-sm">{msg}</p>
      )}

      <form onSubmit={onSubmitHandler} className="space-y-6">
        
        {/* Email */}
        <div>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-teal-400 focus:outline-none"
            type="email"
            placeholder="Email"
            required
          />
        </div>

        {/* Password */}
        <div>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-teal-400 focus:outline-none"
            type={showPassword? "text":"password"}
            placeholder="Password"
            required
          />

          {/* Show Password */}
          <label className="flex items-center gap-2 text-sm text-gray-600 mt-2">
            <input type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}

             />
            Show Password
          </label>
        </div>

        {/* Sign In Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2 rounded-md text-sm font-medium transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (state === "Sign Up" ? "Creating..." : "Logging in...") : state === "Login" ? "SIGN IN" : "SIGN UP"}
          </button>
        </div>

      </form>

      {/* Bottom Links */}
        <div className="text-center mt-6 text-sm text-gray-700 space-y-2">
      <p>
        {state === "Login" ? (
          <>
            Don't have an account?{" "}
            <span
              className="text-teal-600 cursor-pointer hover:underline"
              onClick={() => {
                setState("Sign Up");
                setMsg("");
                setPassword("");
              }}
            >
              Sign up
            </span>
          </>
        ) : (
          <>
            Already a user?{" "}
            <span
              className="text-teal-600 cursor-pointer hover:underline"
              onClick={() => {
                setState("Login");
                setMsg("");
                setPassword("");
              }}
            >
              Login
            </span>
          </>
        )}
      </p>
      
    </div>
    </div>
  </div>


  );
}
