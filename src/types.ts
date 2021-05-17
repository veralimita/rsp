export enum GameScreen {
    MENU = 0,
    GAME = 1
}

export enum GameDifficulty {
    NORMAL = 0,
    HARD = 1
}

export enum GameMode {
    SINGLEPLAYER = 0,
    MULTIPLAYER = 1
}

export enum PlayerType {
    HUMAN = 0,
    COMPUTER = 1
}

export enum Fighters {
    ROCK = 'ROCK',
    SCISSORS = 'SCISSORS',
    PAPER = 'PAPER',
    SPOCK = 'SPOCK',
    LIZARD = 'LIZARD'
}

export interface GameInterface {
    fighters: Array<{ fighter: Fighters, weight: number, dominate: number[] }>;
}

export class NormalGame implements GameInterface {
    fighters = [
        { fighter: Fighters.ROCK, weight: 0, dominate: [1] },
        { fighter: Fighters.SCISSORS, weight: 1, dominate: [2] },
        { fighter: Fighters.PAPER, weight: 2, dominate: [0] }
    ];
}
export class HardGame implements GameInterface {
    fighters = [
        { fighter: Fighters.ROCK, weight: 0, dominate: [1, 3] },
        { fighter: Fighters.SCISSORS, weight: 1, dominate: [2, 3] },
        { fighter: Fighters.PAPER, weight: 2, dominate: [0, 4] },
        { fighter: Fighters.LIZARD, weight: 3, dominate: [2, 4] },
        { fighter: Fighters.SPOCK, weight: 4, dominate: [1, 0] },
    ];
}
