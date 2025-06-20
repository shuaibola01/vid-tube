// ...same imports
export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [related, setRelated] = useState([]);
  const [credits, setCredits] = useState(null);
  const [reviews, setReviews] = useState([]);

  const handleAddToWatchlist = () => {
    const existing = JSON.parse(localStorage.getItem("watchlist")) || [];
    if (!existing.some((item) => item.id === movie.id)) {
      localStorage.setItem("watchlist", JSON.stringify([...existing, movie]));
      alert("Added to watchlist");
    } else {
      alert("Movie already in watchlist");
    }
  };

  const handleAddToFavorites = () => {
    const existing = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!existing.some((item) => item.id === movie.id)) {
      localStorage.setItem("favorites", JSON.stringify([...existing, movie]));
      alert("Added to favorites");
    } else {
      alert("Movie already in favorites");
    }
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      const resMovie = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
      const resCredits = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
      const resRelated = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
      const resReviews = await fetch(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`);

      const movieData = await resMovie.json();
      const creditsData = await resCredits.json();
      const relatedData = await resRelated.json();
      const reviewsData = await resReviews.json();

      setMovie(movieData);
      setCredits(creditsData);
      setRelated(relatedData.results || []);
      setReviews(reviewsData.results.slice(0, 2));
    };

    fetchMovieData();
  }, [id]);

  const director = credits?.crew?.find((person) => person.job === "Director");
  const cast = credits?.cast?.slice(0, 4);

  if (!movie) return <div className="text-white p-10">Loading...</div>;

  return (
    <SC.Main4 className="bg-background min-h-screen text-light-text flex flex-col lg:flex-row">
      {/* Left Panel - Poster */}
      <div className="w-full lg:w-1/2 p-4 lg:pl-12">
        <div className="flex justify-between items-center mb-4">
          <Link to="/home"><ArrowLeft size={22} /></Link>
          <img src={logo} alt="logo" className="h-10" />
          <Link to="/library"><Bookmark size={22} /></Link>
        </div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-xl w-full shadow-md"
        />
      </div>

      {/* Right Panel - Info */}
      <div className="w-full lg:w-1/2 p-4 lg:pr-12 flex flex-col">
        <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
        <p className="text-gray-300 mb-4 text-justify">{movie.overview}</p>

        <div className="text-sm mb-4">
          <p><strong>Director:</strong> {director?.name || "Unknown"}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Cast</h2>
          <div className="flex gap-2">
            {cast?.map((actor, i) => (
              <div
                key={actor.id}
                className={`w-12 h-12 rounded-full overflow-hidden border-2 border-input ${i !== 0 ? "-ml-2" : ""}`}
              >
                <img
                  src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : "https://via.placeholder.com/60"}
                  alt={actor.name}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : reviews.map((r) => (
            <div key={r.id} className="mb-4 text-sm">
              <div className="flex items-center gap-3">
                <img
                  src={`https://ui-avatars.com/api/?name=${r.author}`}
                  alt={r.author}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-semibold">{r.author}</p>
                  <p className="text-xs text-gray-400">{new Date(r.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <p className="mt-2 text-gray-300">{r.content.slice(0, 150)}...</p>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Related Movies</h2>
          <div className="flex overflow-x-auto gap-3 custom-scroll">
            {related.map((rel) => (
              <div key={rel.id} className="min-w-[140px] bg-container rounded-lg overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w200${rel.poster_path}`}
                  alt={rel.title}
                  className="w-full h-[200px] object-cover"
                />
                <p className="text-sm text-center p-1">{rel.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAddToWatchlist}
            className="w-full bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg"
          >
            Add to Watchlist
          </button>
          <button
            onClick={handleAddToFavorites}
            className="w-full bg-input hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Add to Favorites
          </button>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 w-full lg:hidden z-50">
        <BottomNav />
      </div>
    </SC.Main4>
  );
}
