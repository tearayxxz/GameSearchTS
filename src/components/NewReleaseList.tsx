import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGameStore } from "../store/useGameStore";

export default function NewReleaseList() {
  const { newReleaseGames, fetchNewReleaseGames } = useGameStore();

  useEffect(() => {
    fetchNewReleaseGames();
  }, [fetchNewReleaseGames]);

  return (
    <div className="max-w-[1127px] m-auto mt-[24px]">
      <div className="flex justify-between text-[24px] mb-4 max-w-[83%] m-auto">
        <h1>New Release</h1>
        <Link to="/games?type=new-release" className="hover:underline hover:text-slate-600">Show all</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[83%] mx-auto justify-center">
        {newReleaseGames.slice(0, 3).map((game, index) => (
          <Link
            key={index}
            to={`/games/${game.id}`}
            className="card bg-white shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <figure>
              <img src={game.background_image} alt={game.name} className="w-full h-64 sm:h-48 object-cover transition-all bg-slate-800 text-center text-white" />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-base font-semibold line-clamp-none sm:line-clamp-2 sm:h-12">{game.name}</h2>
              <p>{game.released}</p>
              <p>
                {game.platforms
                  ?.map((platform: any) => platform.platform.name)
                  .join(", ")}
              </p>
              <p>Rating: {game.rating}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
