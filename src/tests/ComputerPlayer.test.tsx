import Player, { PlayerProps } from '../components/Player';
import { render } from '@testing-library/react';
import '../i18n';
import * as reactRedux from 'react-redux';
import store from '../store';
import { PlayerType, Fighters, GameDifficulty } from '../types';
import { setDificulty } from '../slice';
import { setTimeout } from 'timers';

let fighter: { fighter: Fighters, weight: number, dominate: number[] };
const setFighter = (value: { fighter: Fighters, weight: number, dominate: number[] }) => { fighter = value; };

const props: PlayerProps = {
    type: PlayerType.COMPUTER,
    id: 'player1',
    onSelect: setFighter
};

const createPlayer = () => {
    return render(<reactRedux.Provider store={store}><Player {...props} /></reactRedux.Provider>);
};

beforeEach(createPlayer);

test('Player created as Computer', () => {
    const element = document.querySelector('.player-1');
    expect(element).toBeInTheDocument();
});

test('Computer selected a fighter', async () => {
    store.dispatch(setDificulty(GameDifficulty.NORMAL));
    await new Promise(resolve => setTimeout(
        resolve, 2000));
    expect(fighter).toBeDefined();
});
