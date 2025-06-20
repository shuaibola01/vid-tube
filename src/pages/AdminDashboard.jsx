import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import * as SC from "../../style";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [usersRes, meRes] = await Promise.all([
          API.get("/api/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          API.get("/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUsers(usersRes.data);
        setCurrentUserId(meRes.data.user._id);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.message || err.message);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/api/admin/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <SC.Main8 className="min-h-screen bg-[var(--color-background)] text-white px-6 py-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-light-text)] mb-2">
            Admin Dashboard
          </h1>
          <p className="text-[var(--color-sub-text)]">
            Manage registered users here.
          </p>
        </header>

        {error && (
          <div className="bg-red-600/20 border border-red-600 text-red-300 p-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-[var(--color-container)] rounded-xl p-4 shadow-md flex flex-col justify-between space-y-4"
            >
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-light-text)]">
                  {user.username}
                </h3>
                <p className="text-[var(--color-sub-text)] text-sm">
                  {user.email}
                </p>
              </div>

              <div className="flex justify-between items-center">
                {user._id === currentUserId ? (
                  <span className="text-[var(--color-btn-text)] italic text-sm">
                    [You]
                  </span>
                ) : (
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-[var(--color-buttons)] text-white text-sm px-3 py-1 rounded hover:opacity-90 transition"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SC.Main8>
  );
}
