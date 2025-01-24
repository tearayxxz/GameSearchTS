import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Footer from "../components/Footer";
import GeneList from "../components/GeneList";
import Navbar from "../components/Navbar";
import NewReleaseList from "../components/NewReleaseList";
import TrendingList from "../components/TrendingList";
import Banner from "../images/Banner.svg";
import Logo from "../images/Logo.svg";
import SearchIcon from "../images/searchIcon.svg";
import { useGameStore } from "../store/useGameStore";
import GameCard from "../components/GameCard";
import LoadingSpinner from "../components/LoadingSpinner";

interface SearchFormData {
  searchQuery: string;
}

export default function Home() {
  const { register, watch } = useForm<SearchFormData>();
  const { searchResults, searchGames } = useGameStore();
  const searchQuery = watch("searchQuery");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (searchQuery) {
      const delayDebounceFn = setTimeout(() => {
        searchGames(searchQuery);
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchQuery, searchGames]);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white">
      <Navbar />
      <div className="max-w-[1127px] m-auto relative">
        <img
          src={Banner}
          alt="Banner"
          className="shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] w-full"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <img src={Logo} alt="GameSearch" />
          <form
            className="flex justify-between items-center bg-white rounded-full px-4 py-2 shadow-md w-[100%] md:w-[80%] mx-auto mt-[26px] transition-all"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="text"
              placeholder="Search..."
              {...register("searchQuery")}
              className="outline-none bg-white w-full"
            />
            <button type="button">
              <img src={SearchIcon} alt="Search Icon" className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
      {searchQuery && searchResults.length > 0 ? (
        <div className="max-w-[1127px] mx-auto mt-[24px]">
          <div className="p-5 mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              Search Results{" "}
              <span className="text-sm">
                (show {searchResults.length} items)
              </span>
            </h2>
            <div className="flex flex-row flex-grow justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-all">
                {searchResults.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <GeneList />
          <TrendingList />
          <NewReleaseList />
        </>
      )}

      <Footer />
    </div>
  );
}
