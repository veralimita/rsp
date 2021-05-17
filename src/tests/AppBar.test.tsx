import App from '../App';
import { render, screen, fireEvent } from '@testing-library/react';
import '../i18n';
import * as reactRedux from 'react-redux';
import store from '../store';
import { GameDifficulty, GameScreen } from '../types';
import { setDificulty, setScreen } from '../slice';

const createApp = () => {
    return render(<reactRedux.Provider store={store}><App /></reactRedux.Provider>);
};

beforeEach((done) => {
    store.dispatch(setDificulty(GameDifficulty.NORMAL));
    store.dispatch(setScreen(GameScreen.MENU));
    setTimeout(done, 0);
});

test('Shows game name for normal', () => {
    createApp();
    const element = screen.getByText(/lets rock/i);
    expect(element).toBeInTheDocument();
});

test('Shows game mode for normal', () => {
    createApp();
    const element = screen.getByText(/normal/i);
    expect(element).toBeInTheDocument();
});

test('Shows game name for hard', () => {
    createApp();
    store.dispatch(setDificulty(GameDifficulty.HARD));
    const element = screen.getByText(/lets rock/i);
    expect(element).toBeInTheDocument();
});

test('Shows game mode for hard', () => {
    createApp();
    store.dispatch(setDificulty(GameDifficulty.HARD));
    const element = screen.getByText(/Hard/i);
    expect(element).toBeInTheDocument();
});

test('Click on mode button to change game mode', async () => {
    createApp();
    fireEvent.click(screen.getByText(/Normal/i));
    const element = screen.getByText(/Hard/i);
    expect(element).toBeInTheDocument();
});

test('Dont allow to change game mode in game', async () => {
    createApp();
    store.dispatch(setScreen(GameScreen.GAME));
    fireEvent.click(screen.getByText(/Normal/i));
    const element = screen.getByText(/Normal/i);
    expect(element).toBeInTheDocument();
});
