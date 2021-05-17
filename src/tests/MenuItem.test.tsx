import { MenuItem, MenuItemProps } from '../components/Menu';
import { render, screen } from '@testing-library/react';
import '../i18n';
import { GameMode } from '../types';
import * as reactRedux from 'react-redux';
import store from '../store';
import image from '../static/singleplayer.jpeg';

const props: MenuItemProps = {
    title: 'Singleplayer',
    description: 'Singleplayer description',
    image,
    mode: GameMode.SINGLEPLAYER
};

const createMenuItem = () => {
    return render(<reactRedux.Provider store={store}><MenuItem  {...props} /></reactRedux.Provider >);
};

beforeEach(createMenuItem);

test('Menu item has title', () => {
    const element = screen.getByText(props.title);
    expect(element).toBeInTheDocument();
});

test('Menu item has description', () => {
    const element = screen.getByText('Singleplayer description');
    expect(element).toBeInTheDocument();
});

test('Menu item has image', () => {
    const displayedImage = document.querySelector('.MuiCardMedia-root') as HTMLImageElement;
    expect(displayedImage.style._values['background-image']).toContain('singleplayer.jpeg');
});

test('Menu item has START button', () => {
    const element = screen.getByText(/start/i);
    expect(element).toBeInTheDocument();
});
