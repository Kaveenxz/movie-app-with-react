import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODk2ZGY2ZjY5ZjIxOWEzNTRjZTU4NDgzNmU2ZmI4NiIsIm5iZiI6MTc0MTQyMTA3NS44MDgsInN1YiI6IjY3Y2JmYTEzN2M5NjdlMDRkNTViYTNiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u-7Si3ur9o2zeGVAbvgGSN_0Blq3ZxbM56PVOnW3Grc";

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const endpoint = `${API_BASE_URL}/movie/${id}?language=en-US&append_to_response=videos`;
        const response = await fetch(endpoint, API_OPTIONS);
        if (!response.ok) throw new Error("Movie not found");

        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  // Get trailer video if available
  const trailer = movie.videos?.results?.find((vid) => vid.type === "Trailer");

  return (
    <div className="min-h-screen bg-[#0f0f1b] text-white p-6 flex justify-center">
  <div className="max-w-6xl bg-[#161629] p-6 md:px-16 rounded-2xl shadow-lg 
                  ring-2 ring-indigo-600 animate-glow">

        {/* Title & Rating */}
        <div className="flex justify-between items-center">
          <div><h1 className="text-4xl font-bold">{movie.title}</h1></div>
          <div className="bg-[#222245] px-3 py-1 rounded-lg flex items-center gap-2">
            ⭐ <span className="text-yellow-400 font-bold">{movie.vote_average?.toFixed(1)}</span>
            <span className="text-gray-400">({movie.vote_count})</span>
          </div>
        </div>

        {/* Release Date, Runtime, Rating */}
        <p className="text-gray-400 mt-1">
          {movie.release_date?.split("-")[0]} • {movie.runtime} min • {movie.adult ? "R" : "PG-13"}
        </p>

        {/* Movie Details Grid */}
        <div className="mt-6 flex justify-center gap-4">
          {/* Left - Poster */}
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg h-[27rem]"
          />

          {/* Middle - Trailer */}
          {trailer ? (

            <div className="relative group cursor-pointer">

              <img
                src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
                alt={movie.title}
                className="rounded-lg h-[27rem] w-full object-cover"
              />

              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <FaPlayCircle className="text-white text-6xl drop-shadow-lg" />
              </a>
            </div>

          ) : (
            <div className="text-center text-gray-400">No Trailer Available</div>
          )}

          {/* Right - Overview & Genres */}

        </div>

        {/* Additional Details */}
        <div className="mt-6 grid grid-cols-1">

        <div className="mt-6 flex justify-between items-center">
          {/* Genres on the Left */}
          <div>
            
            <div className="flex flex-wrap gap-2 ">
            <h3 className="text-lg font-semibold mr-36">Genres</h3>
              {movie.genres?.map((genre) => (
                <div>
                  
                <span
                  key={genre.id}
                  className="bg-indigo-900 text-white px-3 py-2 rounded-sm text-sm"
                >
                  {genre.name}
                </span>
                </div>
              ))}
            </div>
          </div>

          {/* Go to Home Button on the Right */}
          <button
            onClick={() => navigate("/")}
            className="bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Back to Home
          </button>
        </div>

          <div className="flex mt-6">
            <h3 className="text-lg font-semibold mr-34">Overview</h3>
            <p className="text-gray-400">{movie.overview}</p>
          </div>

          <div className="flex mt-4 items-center">
            <h3 className="text-lg font-semibold mr-26">Release Date</h3>
            <p className="text-gray-400">{movie.release_date}</p>
          </div>

          <div className="flex mt-4 items-center">
            <h3 className="text-lg font-semibold mr-33">Countries</h3>
            <p className="text-gray-400">
              {movie.production_countries?.map((c) => c.name).join(", ") || "N/A"}
            </p>
          </div>

          <div className="flex mt-4 items-center">
            <h3 className="text-lg font-semibold mr-39">Budget</h3>
            <p className="text-gray-400">
              {movie.budget ? `$${movie.budget.toLocaleString()}` : "N/A"}
            </p>
          </div>

          <div className="mt-4 flex items-center">
            <h3 className="text-lg font-semibold mr-36">Revenue</h3>
            <p className="text-gray-400">
              {movie.revenue ? `$${movie.revenue.toLocaleString()}` : "N/A"}
            </p>
          </div>

          <div className="mt-4 flex items-center">
            <h3 className="text-lg font-semibold mr-32">Languages</h3>
            <p className="text-gray-400">
              {movie.spoken_languages?.map((l) => l.english_name).join(", ") || "N/A"}
            </p>
          </div>

          <div className="mt-4 flex items-center">
            <h3 className="text-lg font-semibold mr-41">Status</h3>
            <p className="text-gray-400">
              {movie.status || "N/A"}
            </p>
          </div>

          <div className="mt-4 flex items-center">
            <h3 className="text-lg font-semibold mr-40">tagline</h3>
            <p className="text-gray-400">
              {movie.tagline || "N/A"}
            </p>
          </div>

          <div className="mt-4 flex items-center">
            <h3 className="text-lg font-semibold mr-6">Production Companies</h3>
            <p className="text-gray-400">
              {movie.production_companies?.map((p) => p.name).join(", ") || "N/A"}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MovieDetails;
