import React, { useState } from "react";
import { CustomInput } from "../components/input";
import { CustomButton } from "../components/button";
import { EyeOff, Eye, ArrowLeft } from "lucide-react";
import * as SC from "../../style";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import logo from "/logo.png";

export default function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await API.post("/api/auth/register", {
        username,
        email,
        password,
      });

      const loginRes = await API.post("/api/auth/login", {
        username,
        email,
        password,
      });

      localStorage.setItem("token", loginRes.data.token);
      localStorage.setItem("username", loginRes.data.user.username);
      navigate("/home");
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || "Registration failed.");
      setLoading(false);
    }
  };

  return (
    <SC.Main className="min-h-screen bg-background text-light-text flex flex-col lg:flex-row">
      {/* Branding Left Section */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-[var(--color-container)] p-10 text-center">
        <span className="flex items-center gap-4">

          <Link to="/log_in">
            <ArrowLeft size={40} className="mt-4" />
          </Link>
        <img src={logo} alt="Logo" className="h-40" />
          </span>
        <h2 className="text-3xl font-bold mb-2">Join VidTube</h2>
        <p className="text-gray-400 text-sm max-w-md">
          Sign up to discover trending movies, create your personalized watchlist, and explore new worlds.
        </p>
      </div>

      {/* Sign Up Form Section */}
      <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 py-8">
        {/* Mobile Header */}
        <div className="flex justify-between items-center w-full max-w-md mb-6 lg:hidden">
          
          <h2 className="text-md font-semibold">VidTube</h2>
          <Link to="/">
            <img src={logo} alt="Logo" className="h-10" />
          </Link>
        </div>

        <form
          onSubmit={handleRegister}
          className="w-full max-w-md space-y-5 bg-container p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-2 text-center">Create an Account</h3>

          <CustomInput
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            rightIcon={null}
          />

          <CustomInput
            name="email"
            placeholder="Email (case sensitive)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            rightIcon={null}
          />

          <CustomInput
            name="password"
            placeholder="Create Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightIcon={
              <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />

          <CustomInput
            name="confirmPassword"
            placeholder="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            rightIcon={
              <button type="button" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />

          {errorMsg && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}

          <CustomButton
            type="submit"
            title={loading ? "Creating Account..." : "Sign Up"}
            className="w-full p-3 disabled:opacity-50"
            disabled={loading}
            onClick={() => {}}
          />
        </form>
      </div>
    </SC.Main>
  );
}
