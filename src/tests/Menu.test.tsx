import Menu from '../components/Menu';
import { render, screen } from '@testing-library/react';
import '../i18n';
import * as reactRedux from 'react-redux';
import store from '../store';

const createMenu = () => {
    return render(<reactRedux.Provider store={store}><Menu /></reactRedux.Provider>);
};

beforeEach(createMenu);

test('Menu has 1 Player mode', () => {
    const element = screen.getByText(/Singleplayer/i);
    expect(element).toBeInTheDocument();
});

test('Menu has multiplayer mode', () => {
    const element = screen.getByText(/Multiplayer/i);
    expect(element).toBeInTheDocument();
});
