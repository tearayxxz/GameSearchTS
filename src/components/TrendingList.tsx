import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTrendingStore } from "../store/useTrendingStore";

export default function TrendingList() {
  const { trendingGames, fetchTrendingGames } = useTrendingStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchTrendingGames();
      setLoading(false);
    };

    fetchData();
  }, [fetchTrendingGames]);

  return (
    <div className="max-w-[1127px] m-auto mt-[24px]">
      {/* Header Section */}
      <div className="flex justify-between text-[24px] mb-4 max-w-[83%] m-auto">
        <h1>Trending</h1>
        <Link
          to="/games?type=trending"
          className="text-orange-500 hover:underline hover:text-orange-600"
        >
          show all 12 items
        </Link>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-12 grid-rows-2 gap-4">
        {loading
          ? // Show skeleton when loading
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className={`${
                  index === 0
                    ? "col-span-6 col-start-2 row-span-2"
                    : "col-span-4 col-start-8"
                }`}
              >
                <div
                  className={`w-full flex items-center justify-center bg-gray-300 rounded-xl object-cover transform transition-transform duration-300 animate-pulse ${
                    index === 0
                      ? "rounded-3xl h-80 sm:h-[429px] hover:scale-105 hover:shadow-2xl"
                      : "rounded-3xl h-full hover:scale-105 hover:shadow-2xl"
                  }`}
                >
                  <svg
                    className="w-10 h-10 text-gray-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 20"
                  >
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                  </svg>
                </div>
              </div>
            ))
          : // Show actual games when loaded
            trendingGames.slice(0, 3).map((game, index) => (
              <Link
                key={index}
                to={`/games/${game.id}`}
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
