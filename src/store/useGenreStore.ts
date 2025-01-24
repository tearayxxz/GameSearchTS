import {create} from 'zustand';
import { getGenres, getGenreImages } from '../services/api';

interface GenreState {
  genres: any[];
  imgGenresData: any[];
  fetchGenres: () => Promise<void>;
}

export const useGenreStore = create<GenreState>((set) => ({
  genres: [],
  imgGenresData: [],
  fetchGenres: async () => {
    const genresData = await getGenres();
    const genresImagesData = await getGenreImages();
    set({ genres: genresData, imgGenresData: genresImagesData });
  },
}));