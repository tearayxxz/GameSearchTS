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

  if (loading) {
    return <LoadingSpinner />;
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
