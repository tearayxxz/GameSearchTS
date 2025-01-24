import { create } from 'zustand';
import { getGameDetails, getGameTrailers, getGameScreenshots } from '../services/api';

interface GameDetailState {
  gameDetails: any | null;
  gameTrailers: any[] | null;
  gameScreenshots: any[] | null;
  fetchGameDetails: (id: string) => Promise<void>;
  error: string | null;
}

export const useGameDetailStore = create<GameDetailState>((set) => ({
  gameDetails: null,
  gameTrailers: null,
  gameScreenshots: null,
  error: null,
  fetchGameDetails: async (id: string) => {
    try {
      const [details, trailers, screenshots] = await Promise.all([
        getGameDetails(id),
        getGameTrailers(id),
        getGameScreenshots(id),
      ]);
      set({ gameDetails: details, gameTrailers: trailers, gameScreenshots: screenshots, error: null });
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        set({ error: 'Game not found', gameDetails: null, gameTrailers: null, gameScreenshots: null });
      } else {
        set({ error: 'Failed to fetch game details', gameDetails: null, gameTrailers: null, gameScreenshots: null });
      }
    }
  },
}));