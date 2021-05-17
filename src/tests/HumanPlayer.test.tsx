import Player, { PlayerProps } from '../components/Player';
import { render, screen, fireEvent } from '@testing-library/react';
import '../i18n';
import * as reactRedux from 'react-redux';
import store from '../store';
import { PlayerType, Fighters, GameDifficulty } from '../types';
import { setDificulty } from '../slice';

let fighter: { fighter: Fighters, weight: number, dominate: number[] };
const setFighter = (value: { fighter: Fighters, weight: number, dominate: number[] }) => { fighter = value; };

const props: PlayerProps = {
    type: PlayerType.HUMAN,
    id: 'player1',
    onSelect: setFighter
};

const createPlayer = () => {
    return render(<reactRedux.Provider store={store}><Player {...props} /></reactRedux.Provider>);
};

beforeEach((done) => {
    createPlayer();
    setTimeout(done, 0);
});

test('Player created as Human', () => {
    const element = document.querySelector('.player-0');
    expect(element).toBeInTheDocument();
});

test('Player sees SELECT FIGHTER label', () => {
    const element = screen.getByText(/Select your fighter/i);
    expect(element).toBeInTheDocument();
});

test('Player sees all fighters', () => {
    store.dispatch(setDificulty(GameDifficulty.NORMAL));
    const element = document.querySelectorAll('button');
    expect(element.length).toBe(3);
});

test('Player can select a fighter', () => {
    store.dispatch(setDificulty(GameDifficulty.NORMAL));
    const element = document.querySelectorAll('button');
    expect(fighter).toBeUndefined();
    fireEvent.click(element[0]);
    expect(fighter).toBeDefined();
});