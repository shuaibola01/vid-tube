import React, { useState } from "react";
import { CustomInput } from "../components/input";
import { ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav.tsx/bottomNav";
import * as SC from "../../style";
import logo from "/logo.png";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function SearchFunction() {
  const [movieName, setMovieName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!movieName.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movieName)}`
      );
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SC.Main3 className="min-h-screen bg-background text-white flex flex-col items-center px-4">
      <div className="w-full max-w-xl py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Link to="/home">
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-lg font-bold">Search Movies</h2>
          <img src={logo} alt="Logo" className="h-10" />
        </div>

        {/* Input */}
        <form onSubmit={handleSearch} className="mb-6">
          <CustomInput
            name="movieName"
            placeholder="Search by movie name"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            rightIcon={
              <button type="submit">
                <Search size={20} className="text-gray-400" />
              </button>
            }
          />
        </form>

        {/* Search Results */}
        <div>
          {isLoading && (
            <p className="text-center mt-4 text-sm text-gray-400">
              Searching...
            </p>
          )}

          {!isLoading && movieName && searchResults.length === 0 && (
            <p className="text-center mt-4 text-sm text-gray-400">
              No results found.
            </p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {searchResults.map((movie) => (
              <Link
                to={`/movie/${movie.id}`}
                key={movie.id}
                className="bg-red-900/30 rounded-md overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      : "https://via.placeholder.com/200x300?text=No+Image"
                  }
                  alt={movie.title}
                  className="w-full h-[250px] object-cover"
                />
                <p className="p-2 text-sm truncate text-center">{movie.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav for mobile */}
      <div className="fixed bottom-0 w-full max-w-md z-50 bg-input text-white py-3 px-4 shadow-inner lg:hidden">
        <BottomNav />
      </div>
    </SC.Main3>
  );
}
