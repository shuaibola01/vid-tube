import React, { useState } from "react";
import { CustomInput } from "../components/input";
import { CustomButton } from "../components/button";
import { EyeOff, Eye } from "lucide-react";
import * as SC from "../../style";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { jwtDecode } from "jwt-decode";
import logo from "/logo.png";

export default function LogIn() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/api/auth/login", {
        email: identifier,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      const decoded = jwtDecode<{ isAdmin?: boolean }>(token);

      if (decoded.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || "Login failed.");
      setLoading(false);
    }
  };

  return (
    <SC.Main className="min-h-screen bg-background text-light-text flex flex-col lg:flex-row">
      {/* Left branding section for large screens */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-[var(--color-container)] p-10 text-center">
        <img src={logo} alt="Logo" className="h-40 " />
        <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
        <p className="text-gray-400 text-sm max-w-md">
          Log in to explore trending movies, manage your watchlist, and discover
          something new.
        </p>
      </div>

      {/* Login Form Section */}
      <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 py-8">
        {/* Mobile Header */}
        <div className="flex justify-between items-center w-full max-w-md mb-6 lg:hidden">
          <h2 className="text-lg font-semibold">VidTube Movies</h2>
          <Link to="/">
            <img src={logo} alt="Logo" className="h-10" />
          </Link>
        </div>

        <form
          onSubmit={handleLogin}
          className="w-full max-w-md space-y-5 bg-container p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-2 text-center">Log In</h3>

          <CustomInput
            name="email"
            placeholder="Email or User-Name"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            rightIcon={null}
          />

          <CustomInput
            name="password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />

          {errorMsg && (
            <p className="text-red-500 text-sm text-center">{errorMsg}</p>
          )}

          <p className="text-btn-text text-left text-sm cursor-pointer hover:underline">
            Forgot Password?
          </p>

          <CustomButton
            type="submit"
            title={loading ? "Logging In..." : "Log In"}
            className="w-full p-3 disabled:opacity-50"
            disabled={loading}
            onClick={() => {}}
          />

          <div className="flex justify-between gap-2 mt-4">
            <Link to="/sign_Up" className="w-1/2">
              <CustomButton
                type="button"
                title="Sign Up"
                className="w-full bg-input p-[6px]"
                disabled={loading}
                onClick={() => {}}
              />
            </Link>

            <CustomButton
              type="button"
              title="Continue as guest"
              className="w-1/2 bg-input disabled:opacity-50"
              disabled={loading}
              onClick={() => navigate("/home")}
            />
          </div>
        </form>
      </div>
    </SC.Main>
  );
}
