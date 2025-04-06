// src/services/api.ts
import axios from 'axios';

const API_KEY = process.env.REACT_APP_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api/games';

if (!API_KEY) {
  throw new Error('RAWG API key is missing in environment variables');
}

export const fetchGames = async (params: Record<string, string | number> = {}) => {
  const fullParams = { key: API_KEY, ...params };
  console.log('Full API Params:', fullParams);
  console.log('Request URL:', `${BASE_URL}?${new URLSearchParams(fullParams as any).toString()}`);
  const response = await axios.get(BASE_URL, {
    params: fullParams,
  });
  return response.data;
};

export const fetchGameDetails = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/${id}`, {
    params: {
      key: API_KEY,
    },
  });
  return response.data;
};