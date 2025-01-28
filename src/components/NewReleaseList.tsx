import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGameStore } from "../store/useGameStore";

export default function NewReleaseList() {
  const { newReleaseGames, fetchNewReleaseGames } = useGameStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchNewReleaseGames();
      setLoading(false);
    };

    fetchData();
  }, [fetchNewReleaseGames]);

  return (
    <div className="max-w-[1127px] m-auto mt-[24px]">
      <div className="flex justify-between text-[24px] mb-4 max-w-[83%] m-auto">
        <h1>New Release</h1>
        <Link
          to="/games?type=new-release"
          className="text-orange-500 hover:underline hover:text-orange-600"
        >
          show 12 more items
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[83%] mx-auto justify-center">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="card bg-gray-300 shadow rounded-xl animate-pulse"
              >
                <div className="w-full h-64 sm:h-48 bg-gray-300 dark:bg-gray-700 rounded-t-xl"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-400 rounded mb-2"></div>
                  <div className="h-6 w-[50%] bg-gray-400 rounded mb-2"></div>
                  <div className="h-4 bg-gray-400 rounded mb-2"></div>
                  <div className="h-4 bg-gray-400 rounded"></div>
                </div>
              </div>
            ))
          : newReleaseGames.slice(0, 3).map((game, index) => (
              <Link
                key={index}
                to={`/games/${game.id}`}
                className="card shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-white backdrop-filter backdrop-blur-3xl bg-opacity-10"
              >
                <figure>
                  <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-full h-64 sm:h-48 object-cover transition-all bg-slate-800 text-center text-white"
                  />
                </figure>
                <div className="card-body p-4">
                  <h1 className="card-title text-base font-semibold line-clamp-none sm:line-clamp-2 sm:h-12">
                    {game.name}
                  </h1>
                  <p className=" text-orange-300">{game.released}</p>
                  <p className=" text-orange-400">
                    {game.platforms
                      ?.map((platform: any) => platform.platform.name)
                      .join(", ")}
                  </p>
                  <p className=" text-orange-400">Rating: {game.rating}</p>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}
