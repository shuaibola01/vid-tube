import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../api/tmdb";
import logo from "/logo.png";
import NewRelease from "../components/newRelease/newRelease";
import Trending from "../components/Trending/trending";
import PopularCategories from "../components/PopularCategory/popularCategories";
import BottomNav from "../components/BottomNav.tsx/bottomNav";
import * as SC from "../../style";
import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);

    async function loadMovies() {
      try {
        const movies = await fetchTrendingMovies();
        setTrendingMovies(movies);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    }

    loadMovies();
  }, []);

  return (
    <SC.Main2 className="min-h-screen bg-background text-light-text overflow-hidden ">
      {/* Wrapper for both layouts */}
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-muted bg-container lg:px-8 lg:py-6 ">
          <Link to="/home">
            <img src={logo} alt="Trendz Logo" className="h-10 lg:h-12" />
          </Link>
          <h2 className="text-sm font-medium capitalize lg:text-xl">
            Welcome, {username || "Guest"}
          </h2>
          <Link to="/profile">
            <UserCircle
              size={28}
              className="text-light-text hover:scale-105 transition-transform"
            />
          </Link>
        </div>

        {/* Main content area */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:px-1 lg:py-6 gap-6">
          {/* Left Section (or top for mobile) */}
          <div className="flex-1 space-y-4  lg:px-0 overflow-x-scroll">
            <Trending />
            <NewRelease />
            <PopularCategories />
          </div>
        </div>
      </div>

      {/* Bottom Nav: visible only on small screens */}
      <div className=" fixed bottom-0 w-full bg-input text-white py-3 flex justify-between items-center shadow-inner z-50 ">
        <BottomNav/>
      </div>
    </SC.Main2>
  );
}
