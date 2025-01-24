import { create } from "zustand";
import { getPopularGames } from "../services/api";

interface TrendingState {
  trendingGames: any[];
  fetchTrendingGames: () => Promise<void>;
}

export const useTrendingStore = create<TrendingState>((set) => ({
  trendingGames: [],
  fetchTrendingGames: async () => {
    const games = await getPopularGames();
    set({ trendingGames: games.slice(0, 12) });
  },
}));
