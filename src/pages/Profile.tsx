import React, { useState, useEffect } from "react";
import * as SC from "../../style";
import logo from "/logo.png";
import BottomNav from "../components/BottomNav.tsx/bottomNav";
import API from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { CustomInput } from "../components/input";
import { ArrowLeft } from "lucide-react";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        const { data } = await API.get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsername(data.username);
        setNewUsername(data.username);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setIsFetching(false);
      }
    }

    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      setUpdateLoading(true);
      const token = localStorage.getItem("token");
      await API.put(
        "/api/users/update",
        { username: newUsername },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsername(newUsername);
      alert("Username updated!");
    } catch (err) {
      alert("Update failed");
      console.error(err);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      setDeleteLoading(true);
      const token = localStorage.getItem("token");
      await API.delete("/api/users/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      alert("Failed to delete account.");
      console.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      const token = localStorage.getItem("token");
      await API.post(
        "/api/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      setLogoutLoading(false);
      navigate("/log_In");
    }
  };

  return (
    <SC.Main6 className="min-h-screen bg-background text-light-text flex flex-col items-center">
      <div className="w-full max-w-xl px-4 py-8">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <Link to="/home">
            <ArrowLeft size={22} />
          </Link>
          <h2 className="text-xl font-semibold">
            {isFetching ? "Loading..." : `Welcome, ${username}`}
          </h2>
          <img src={logo} alt="Logo" className="h-10" />
        </div>

        {/* Profile Section */}
        <div className="bg-container rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-2">Update Your Info</h3>

          <CustomInput
            name="username"
            placeholder="Enter New Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            rightIcon={null}
            className="mb-5"
          />

          <button
            onClick={handleUpdate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mb-4 disabled:opacity-50"
            disabled={updateLoading}
          >
            {updateLoading ? "Updating..." : "Update Username"}
          </button>

          <button
            onClick={handleDelete}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded mb-4 disabled:opacity-50"
            disabled={deleteLoading}
          >
            {deleteLoading ? "Deleting..." : "Delete Account"}
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded disabled:opacity-50"
            disabled={logoutLoading}
          >
            {logoutLoading ? "Logging Out..." : "Log Out"}
          </button>
        </div>
      </div>

      {/* Bottom Nav on Mobile */}
      <div className="fixed bottom-0 w-full z-50 lg:hidden">
        <BottomNav />
      </div>
    </SC.Main6>
  );
}
