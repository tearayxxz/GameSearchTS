import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTrendingStore } from "../store/useTrendingStore";

const API_KEY = "d0dc6eac4c6c4f5aa79eb4f6f4d79852";

export default function TrendingList() {
  const { trendingGames, fetchTrendingGames } = useTrendingStore();

  useEffect(() => {
    fetchTrendingGames();
  }, [fetchTrendingGames]);

  return (
    <div className="max-w-[1127px] m-auto mt-[24px]">
      {/* Header Section */}
      <div className="flex justify-between text-[24px] mb-4 max-w-[83%] m-auto">
        <h1>Trending</h1>
        <Link to="/games?type=trending" className="hover:underline hover:text-slate-600">Show all</Link>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-12 grid-rows-2 gap-4">
        {trendingGames.slice(0, 3).map((game, index) => (
          <Link
            key={index}
            to={`/games/${game.id}?key=${API_KEY}`}
            className={`${
              index === 0
                ? "col-span-6 col-start-2 row-span-2"
                : "col-span-4 col-start-8"
            }`}
          >
            <img
              src={game.background_image}
              alt={game.name}
              className={`w-full rounded-xl object-cover transform transition-transform duration-300 ${
                index === 0
                  ? "max-h-[429px] rounded-3xl h-full hover:scale-105 hover:shadow-2xl"
                  : "max-h-[200px] rounded-3xl h-full hover:scale-105 hover:shadow-2xl"
              }`}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}