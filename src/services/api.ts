import axios from 'axios';
import dayjs from 'dayjs';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

// ฟังก์ชันคำนวณ Trending Score
const calculateTrendingScore = (game: any) => {
  const ratingScore = game.rating || 0;
  const popularityScore = game.popularity || 0;
  const newUpdatedBonus = game.released ? 5 : 0;
  const platformBonus = game.platforms ? game.platforms.length : 0;
  const genreBonus = game.genres ? game.genres.length : 0;

  // calculator Trending Score
  return ratingScore + popularityScore + newUpdatedBonus + platformBonus + genreBonus;
};

export const getPopularGames = async () => {
  const response = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: API_KEY,
      ordering: '-rating',
      page_size: 12,
    },
  });

  const gamesWithTrendingScores = response.data.results.map((game: any) => {
    const trendingScore = calculateTrendingScore(game);
    return { ...game, trendingScore }; 
  });

  gamesWithTrendingScores.sort((a: any, b: any) => b.trendingScore - a.trendingScore);

  return gamesWithTrendingScores;
};

export const getGenres = async () => {
  const response = await axios.get(`${BASE_URL}/genres`, {
    params: {
      key: API_KEY,
    },
  });

  return response.data.results;
};

export const getGenreImages = async () => {
  const response = await axios.get(`${BASE_URL}/genres`, {
    params: {
      key: API_KEY,
    },
  });

  // map the genres data to include their images
  const genresWithImages = response.data.results.map((genre: any) => ({
    id: genre.id,
    name: genre.name,
    image: genre.image_background || "",
  }));

  return genresWithImages;
};

export const getNewReleaseGames = async () => {
  const today = dayjs().format('YYYY-MM-DD');
  const last30Days = dayjs().subtract(30, 'day').format('YYYY-MM-DD');

  const response = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: API_KEY,
      dates: `${last30Days},${today}`,
      ordering: '-released',
      page_size: 12,
    },
  });

  return response.data.results;
};

export const getGameDetails = async (gameId: string) => {
  const response = await axios.get(`${BASE_URL}/games/${gameId}`, {
    params: {
      key: API_KEY,
    },
  });

  return response.data;
};

export const getGameTrailers = async (gameId: string) => {
  const response = await axios.get(`${BASE_URL}/games/${gameId}/movies`, {
    params: {
      key: API_KEY,
    },
  });

  return response.data.results;
};

export const getGameScreenshots = async (gameId: string) => {
  const response = await axios.get(`${BASE_URL}/games/${gameId}/screenshots`, {
    params: {
      key: API_KEY,
    },
  });

  return response.data.results;
};

export const searchGames = async (query: string) => {
  const response = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: API_KEY,
      search: query,
      page_size: 12,
    },
  });

  return response.data.results;
};

export const getGamesByGenre = async (genreId: string) => {
  const response = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: API_KEY,
      genres: genreId,
      page_size: 12,
    },
  });

  return response.data.results;
};