import { create } from "zustand";
import {
  getNewReleaseGames,
  getGameDetails,
  searchGames,
  getGamesByGenre,
} from "../services/api";

interface GameState {
  newReleaseGames: any[];
  gameDetails: any | null;
  searchResults: any[];
  genreGames: any[];
  fetchNewReleaseGames: () => Promise<void>;
  fetchGameDetails: (id: string) => Promise<void>;
  searchGames: (query: string) => Promise<void>;
  fetchGamesByGenre: (genreId: string) => Promise<void>;
}

export const useGameStore = create<GameState>((set) => ({
  newReleaseGames: [],
  gameDetails: null,
  searchResults: [],
  genreGames: [],
  fetchNewReleaseGames: async () => {
    const games = await getNewReleaseGames();
    set({ newReleaseGames: games.slice(0, 12) });
  },
  fetchGameDetails: async (id: string) => {
    const details = await getGameDetails(id);
    set({ gameDetails: details });
  },
  searchGames: async (query: string) => {
    const results = await searchGames(query);
    set({ searchResults: results });
  },
  fetchGamesByGenre: async (genreId: string) => {
    const games = await getGamesByGenre(genreId);
    set({ genreGames: games.slice(0, 12) });
  },
}));
