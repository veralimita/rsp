import Game from '../components/Game';
import { render } from '@testing-library/react';
import '../i18n';
import * as reactRedux from 'react-redux';
import store from '../store';
import { setScreen, setMode } from '../slice';
import { GameScreen, GameMode } from '../types';

const createGame = () => {
    return render(<reactRedux.Provider store={store}><Game /></reactRedux.Provider>);
};

beforeEach((done) => {
    createGame();
    store.dispatch(setScreen(GameScreen.GAME));
    setTimeout(done, 0);
});

test('MULTIPLAYER game is for 2 Humans', async () => {
    store.dispatch(setMode(GameMode.MULTIPLAYER));
    await new Promise(resolve => setTimeout(
        resolve, 0));
    const element = document.querySelectorAll('.player-0');
    expect(element.length).toBe(2);
});

test('SINGLEPLAYER game is for 1 Humans', async () => {
    store.dispatch(setMode(GameMode.SINGLEPLAYER));
    await new Promise(resolve => setTimeout(
        resolve, 0));
    const elementHuman = document.querySelectorAll('.player-0');
    const elementComputer = document.querySelectorAll('.player-1');
    expect(elementHuman.length).toBe(1);
    expect(elementComputer.length).toBe(1);
});
