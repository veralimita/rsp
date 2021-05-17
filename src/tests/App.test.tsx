import App from '../App';
import { render, fireEvent } from '@testing-library/react';
import '../i18n';
import * as reactRedux from 'react-redux';
import store from '../store';
import { setScreen, setDificulty, setError } from '../slice';
import { GameScreen, GameDifficulty, GameMode } from '../types';

const createApp = () => {
    return render(<reactRedux.Provider store={store}><App /></reactRedux.Provider>);
};

beforeEach((done) => {
    createApp();
    done();
});

afterEach((done) => {
    store.dispatch(setScreen(GameScreen.MENU));
    store.dispatch(setDificulty(GameDifficulty.NORMAL));
    store.dispatch(setError(false));
    setTimeout(done, 0);
});

test('Has navbar', () => {
    const element = document.querySelector('.MuiAppBar-root');
    expect(element).toBeInTheDocument();
});

test('Has content', () => {
    const element = document.querySelector('.MuiContainer-root ');
    expect(element).toBeInTheDocument();
});

test('Menu on start', () => {
    const element = document.getElementById('menu');
    expect(element).toBeInTheDocument();
});

test('On click singleplayer START should start the game', () => {
    const button = document.querySelector('#startGame0 button');
    if (!button) {
        expect(button).toBeInTheDocument();
    }
    fireEvent.click(button as HTMLElement);
    expect(store.getState().game.screen).toBe(GameScreen.GAME);
});

test('On click singleplayer START should start the singleplayer game', () => {
    expect(store.getState().game.screen).toBe(GameScreen.MENU);
    const button = document.querySelector('#startGame0 button');
    if (!button) {
        expect(button).toBeInTheDocument();
    }
    fireEvent.click(button as HTMLElement);
    expect(store.getState().game.screen).toBe(GameScreen.GAME);
    expect(store.getState().game.mode).toBe(GameMode.SINGLEPLAYER);
});
