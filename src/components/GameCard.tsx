import React from "react";
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
  return (
    <Link
      to={`/games/${game.id}`}
      className="card bg-white shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <figure>
        <img src={game.background_image} alt={game.name} className="w-full h-64 sm:h-48 object-cover transition-all bg-slate-800 text-center text-white"/>
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-base font-semibold line-clamp-none sm:line-clamp-2 sm:h-12">{game.name}</h2>
        <p>{game.released}</p>
        <p>
          {game.platforms
            ?.map((platform) => platform.platform.name)
            .join(", ")}
        </p>
        <p>Rating: {game.rating}</p>
      </div>
    </Link>
  );
};

export default GameCard;