import axios from "axios";
import dayjs from "dayjs";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

// ฟังก์ชันคำนวณ Trending Score
const calculateTrendingScore = (game: any) => {
  const ratingScore = game.rating || 0;
  const popularityScore = game.popularity || 0;
  const newUpdatedBonus = game.released ? 5 : 0;
  const platformBonus = game.platforms ? game.platforms.length : 0;
  const genreBonus = game.genres ? game.genres.length : 0;

  // Calculate Trending Score
  return (
    ratingScore + popularityScore + newUpdatedBonus + platformBonus + genreBonus
  );
};

export const getPopularGames = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/games`, {
      params: {
        key: API_KEY,
        ordering: "-rating",
        page_size: 12,
      },
    });

    const gamesWithTrendingScores = response.data.results.map((game: any) => {
      const trendingScore = calculateTrendingScore(game);
      return { ...game, trendingScore };
    });

    gamesWithTrendingScores.sort(
      (a: any, b: any) => b.trendingScore - a.trendingScore
    );

    return gamesWithTrendingScores;
  } catch (error) {
    throw new Error(`Failed to fetch popular games: ${error}`);
  }
};

export const getGenres = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genres`, {
      params: {
        key: API_KEY,
      },
    });

    return response.data.results;
  } catch (error) {
    throw new Error(`Failed to fetch genres: ${error}`);
  }
};

export const getGenreImages = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genres`, {
      params: {
        key: API_KEY,
      },
    });

    const genresWithImages = response.data.results.map((genre: any) => ({
      id: genre.id,
      name: genre.name,
      image: genre.image_background || "",
    }));

    return genresWithImages;
  } catch (error) {
    throw new Error(`Failed to fetch genre images: ${error}`);
  }
};

export const getNewReleaseGames = async () => {
  try {
    const today = dayjs().format("YYYY-MM-DD");
    const last30Days = dayjs().subtract(30, "day").format("YYYY-MM-DD");

    const fetchGames = async (page: number = 1) => {
      const response = await axios.get(`${BASE_URL}/games`, {
        params: {
          key: API_KEY,
          dates: `${last30Days},${today}`,
          ordering: "-released",
          page_size: 12,
          page,
        },
      });
      return response.data.results;
    };

    const blacklistIds = ["996579"];
    let filteredGames: any[] = [];
    let page = 1;

    while (filteredGames.length < 12) {
      const games = await fetchGames(page);
      if (!games.length) break;

      const validGames = games.filter((game: any) => {
        return (
          !blacklistIds.includes(game.id.toString()) &&
          game.esrb_rating?.slug !== "adults-only" &&
          game.esrb_rating?.slug !== "rating-pending" &&
          !/adult|hentai|erotic|porn|nsfw|uncensored/i.test(game.name)
        );
      });

      filteredGames = [...filteredGames, ...validGames];
      page++;
    }

    return filteredGames.slice(0, 50);
  } catch (error) {
    throw new Error(`Failed to fetch new release games: ${error}`);
  }
};

export const getGameDetails = async (gameId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/games/${gameId}`, {
      params: {
        key: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch game details for ID ${gameId}: ${error}`);
  }
};

export const getGameTrailers = async (gameId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/games/${gameId}/movies`, {
      params: {
        key: API_KEY,
      },
    });

    return response.data.results;
  } catch (error) {
    throw new Error(`Failed to fetch game trailers for ID ${gameId}: ${error}`);
  }
};

export const getGameScreenshots = async (gameId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/games/${gameId}/screenshots`,
      {
        params: {
          key: API_KEY,
        },
      }
    );

    return response.data.results;
  } catch (error) {
    throw new Error(
      `Failed to fetch game screenshots for ID ${gameId}: ${error}`
    );
  }
};

export const searchGames = async (query: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/games`, {
      params: {
        key: API_KEY,
        search: query,
        page_size: 12,
      },
    });

    return response.data.results;
  } catch (error) {
    throw new Error(
      `Failed to search for games with query "${query}": ${error}`
    );
  }
};

export const getGamesByGenre = async (genreId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/games`, {
      params: {
        key: API_KEY,
        genres: genreId,
        page_size: 12,
      },
    });

    return response.data.results;
  } catch (error) {
    throw new Error(`Failed to fetch games by genre ID ${genreId}: ${error}`);
  }
};
