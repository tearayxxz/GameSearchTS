import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface GameCardProps {
  game: {
    id: number;
    name: string;
    background_image: string;
    rating: number;
    released: string;
    platforms: { platform: { name: string } }[];
  };
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Link
      to={`/games/${game.id}`}
      className="card bg-white shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <figure className="w-full h-64 sm:h-48 bg-slate-800">
        {loading ? (
          <div className="w-72 h-full bg-gray-300 dark:bg-gray-700 animate-pulse flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
            </svg>
          </div>
        ) : (
          <img
            src={game.background_image}
            alt={game.name}
            className="w-72 h-full object-cover text-center text-white transition-all"
          />
        )}
      </figure>
      <div className="card-body p-4 max-w-72">
        {loading ? (
          <>
            <div className="w-full h-6 bg-gray-300 rounded-full animate-pulse mb-2"></div>
            <div className="w-full h-4 bg-gray-300 rounded-full animate-pulse mb-2"></div>
            <div className="w-full h-4 bg-gray-300 rounded-full animate-pulse mb-2"></div>
            <div className="w-full h-4 bg-gray-300 rounded-full animate-pulse"></div>
          </>
        ) : (
          <>
            <h2 className="card-title text-base font-semibold line-clamp-none sm:line-clamp-2 sm:h-12">
              {game.name}
            </h2>
            <p>{game.released}</p>
            <p>
              {game.platforms
                ?.map((platform) => platform.platform.name)
                .join(", ")}
            </p>
            <p>Rating: {game.rating}</p>
          </>
        )}
      </div>
    </Link>
  );
};

export default GameCard;