import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameScreen, GameDifficulty, GameMode } from './types';

interface GameState {
    screen: GameScreen,
    dificulty: GameDifficulty,
    mode: GameMode | null,
    error: string | boolean,
}

const initialState: GameState = {
    screen: GameScreen.MENU,
    dificulty: GameDifficulty.NORMAL,
    mode: null,
    error: false
};

export const slice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setScreen: (state, action: PayloadAction<GameScreen>) => {
            state.screen = action.payload;
        },
        setDificulty: (state, action: PayloadAction<GameDifficulty>) => {
            state.dificulty = action.payload;
        },
        setError: (state, action: PayloadAction<string | boolean>) => {
            state.error = action.payload;
        },
        setMode: (state, action: PayloadAction<GameMode | null>) => {
            state.mode = action.payload;
        },
    },
});

export const { setScreen, setDificulty, setError, setMode } = slice.actions;

export const game = (state: GameState): GameState => state;

export default slice.reducer;
