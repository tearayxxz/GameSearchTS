import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useTrendingStore } from "../store/useTrendingStore";
import { useGameStore } from "../store/useGameStore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";

const API_KEY = "d0dc6eac4c6c4f5aa79eb4f6f4d79852";

interface Game {
  id: number;
  name: string;
  background_image: string;
  released: string;
  platforms: { platform: { name: string } }[];
  rating: number;
}

export default function GameListPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const genreId = queryParams.get("id");

  const { trendingGames, fetchTrendingGames } = useTrendingStore();
  const {
    newReleaseGames,
    fetchNewReleaseGames,
    genreGames,
    fetchGamesByGenre,
  } = useGameStore();

  const [loading, setLoading] = useState(true);
  const [loadingSpinner, setLoadingSpinner] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (type === "trending") {
        await fetchTrendingGames();
      } else if (type === "new-release") {
        await fetchNewReleaseGames();
      } else if (type === "genre" && genreId) {
        await fetchGamesByGenre(genreId);
      }
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };
    fetchData();
  }, [
    type,
    genreId,
    fetchTrendingGames,
    fetchNewReleaseGames,
    fetchGamesByGenre,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingSpinner(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loadingSpinner) {
    return <LoadingSpinner />;
  }

  if (loading) {
    return (
      <div className="bg-white">
        <Navbar />
        <div className="max-w-[1127px] m-auto mt-[24px] p-5">
          <h1 className="text-3xl mb-4">
            {type === "trending"
              ? "Trending Games"
              : type === "new-release"
              ? "New Release Games"
              : "Genre Games"}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="card bg-white shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <figure className="w-full h-64 sm:h-48 bg-slate-800">
                  {/* Skeleton Icon */}
                  <div className="flex items-center justify-center h-64 sm:h-48 bg-gray-300 rounded-sm dark:bg-gray-700">
                    <svg
                      className="w-[1127px] h-10 text-gray-200"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 20"
                    >
                      <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                      <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                    </svg>
                  </div>
                </figure>

                {/* Skeleton Text */}
                <div className="card-body p-4">
                  <div className="w-full h-6 bg-gray-300 rounded-full animate-pulse mb-2"></div>
                  <div className="w-full h-4 bg-gray-300 rounded-full animate-pulse mb-2"></div>
                  <div className="w-full h-4 bg-gray-300 rounded-full animate-pulse mb-2"></div>
                  <div className="w-full h-4 bg-gray-300 rounded-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  let gamesToDisplay: Game[] = [];

  if (type === "trending") {
    gamesToDisplay = trendingGames;
  } else if (type === "new-release") {
    gamesToDisplay = newReleaseGames;
  } else if (type === "genre" && genreId) {
    gamesToDisplay = genreGames;
  }

  return (
    <div className="bg-white">
      <Navbar />
      <div className="max-w-[1127px] m-auto mt-[24px] p-5">
        <h1 className="text-3xl mb-4">
          {type === "trending"
            ? "Trending Games"
            : type === "new-release"
            ? "New Release Games"
            : "Genre Games"}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gamesToDisplay.map((game: Game, index) => (
            <Link
              key={index}
              to={`/games/${game.id}?key=${API_KEY}`}
              className="card bg-white shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <figure>
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="w-full h-64 sm:h-48 object-cover transition-all bg-slate-800 text-center text-white"
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title  text-base font-semibold line-clamp-none sm:line-clamp-2 sm:h-12">
                  {game.name}
                </h2>
                <p>{game.released}</p>
                <p>
                  {game.platforms
                    ?.map((platform) => platform.platform.name)
                    .join(", ")}
                </p>
                <p>Rating: {game.rating}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
