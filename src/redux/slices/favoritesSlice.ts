// src/redux/slices/favoritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
}

interface FavoritesState {
  games: Game[];
}

// Load initial state from localStorage
const loadState = (): Game[] => {
  try {
    const serializedState = localStorage.getItem('favorites');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    console.error('Could not load favorites from localStorage:', e);
    return [];
  }
};

const initialState: FavoritesState = {
  games: loadState(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Game>) => {
      if (!state.games.some((game) => game.id === action.payload.id)) {
        state.games.push(action.payload);
        localStorage.setItem('favorites', JSON.stringify(state.games));
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.games = state.games.filter((game) => game.id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.games));
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;