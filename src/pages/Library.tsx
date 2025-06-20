import { useState, useEffect } from "react";
import logo from "/logo.png";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav.tsx/bottomNav";
import * as SC from "../../style";
import { genreMap } from "../assets/genres/genresMap";

type Movie = {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
  runtime?: number;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
};

export default function Library() {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [activeTab, setActiveTab] = useState<
    "watchlist" | "favourite" | "settings"
  >("watchlist");

  useEffect(() => {
    const storedWatchlist = localStorage.getItem("watchlist");
    const storedFav = localStorage.getItem("favorites");

    setWatchlist(storedWatchlist ? JSON.parse(storedWatchlist) : []);
    setFavorites(storedFav ? JSON.parse(storedFav) : []);
  }, []);

  const handleRemoveFromList = (
    movieId: number,
    listType: "watchlist" | "favorites"
  ) => {
    const updatedList = (
      listType === "watchlist" ? watchlist : favorites
    ).filter((movie) => movie.id !== movieId);

    if (listType === "watchlist") {
      setWatchlist(updatedList);
      localStorage.setItem("watchlist", JSON.stringify(updatedList));
    } else {
      setFavorites(updatedList);
      localStorage.setItem("favorites", JSON.stringify(updatedList));
    }
  };

  const renderMovies = (
    movies: Movie[],
    title: string,
    listType: "watchlist" | "favorites"
  ) => (
    <>
      <h2 className="text-lg font-semibold mb-4 text-left">{title}</h2>
      {movies.length === 0 ? (
        <p className="text-gray-400">No movies in {title.toLowerCase()} yet.</p>
      ) : (
        <div className="grid sm:grid-cols-1 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative flex bg-input rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={movie.title}
                className="w-24 object-cover"
              />

              <div className="p-3 flex flex-col justify-between w-full">
                <Link to={`/movie/${movie.id}`} className="block">
                  <p className="text-xs text-gray-400 mb-1">
                    {movie.genre_ids?.map((id) => genreMap[id]).filter(Boolean).join(", ") ||
                      "Unknown Genre"}
                  </p>
                  <h3 className="font-bold">{movie.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : "Unknown Year"}{" "}
                    • {movie.runtime ? `${movie.runtime} mins` : "Duration Unknown"}
                  </p>
                </Link>

                <button
                  onClick={() => handleRemoveFromList(movie.id, listType)}
                  className="mt-2 w-fit bg-red-700 hover:bg-red-800 text-white text-xs px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );

  return (
    <SC.Main5 className="min-h-screen bg-background text-light-text flex flex-col lg:flex-row">
      {/* Sidebar (on lg) and top header (on mobile) */}
      <aside className="w-full lg:w-64 bg-container p-4 lg:min-h-screen flex flex-col justify-start">
        <div className="flex justify-between items-center mb-6 lg:mb-10">
          <Link to="/home">
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-md lg:text-lg font-semibold">My Library</h2>
          <img src={logo} alt="Logo" className="h-8 lg:h-10" />
        </div>

        {/* Tabs */}
        <nav className="flex flex-row lg:flex-col gap-2 justify-center lg:justify-start">
          {["watchlist", "favourite", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`px-4 py-2 rounded-lg text-sm lg:text-base font-medium transition text-left ${
                activeTab === tab
                  ? "bg-[var(--color-buttons)] text-white"
                  : "bg-muted text-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <section className="flex-1 px-4 py-6 lg:p-8">
        {activeTab === "watchlist" &&
          renderMovies(watchlist, "Your Watchlist", "watchlist")}
        {activeTab === "favourite" &&
          renderMovies(favorites, "Your Favorites", "favorites")}
        {activeTab === "settings" && (
          <div className="text-gray-400 text-center mt-10">
            Settings Coming Soon...
          </div>
        )}
      </section>

      {/* Bottom Nav: small screens only */}
      <div className="fixed bottom-0 w-full bg-input text-white py-3 flex justify-between items-center shadow-inner z-50 lg:hidden">
        <BottomNav />
      </div>
    </SC.Main5>
  );
}
