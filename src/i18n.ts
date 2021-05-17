import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    APP_TITLE: 'Lets rock (scissors and paper)',
                    MODE: ['Normal', 'Hard'],
                    SINGLEPLAYER: 'Singleplayer',
                    SINGLEPLAYER_DESC: 'HUMAN VS. COMPUTER',
                    MULTIPLAYER: 'Multiplayer',
                    MULTIPLAYER_DESC: 'HUMAN VS. HUMAN',
                    COMPUTER: 'COMPUTER',
                    START: 'START',
                    FIGHTERS: { ROCK: 'ROCK', SCISSORS: 'SCISSORS', PAPER: 'PAPER' },
                    ERRORS: ['You can\'t change GAME MODE in the game',
                        'Wrong game mode', 'Game dificulty is not set'],
                    SELECT_FIGHTER: 'Select your fighter',
                    COMPUTER_SELECT_FIGHTER: 'Computer selects fighter',
                }
            }
        },
        lng: 'en',
        fallbackLng: 'en',

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
