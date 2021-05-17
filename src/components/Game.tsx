import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../rootReducer';
import { PlayerType, GameMode, Fighters, GameScreen } from '../types';
import { setError, setScreen } from '../slice';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Player, { PlayerProps } from './Player';
import { Button } from '@material-ui/core';

export enum GameResult {
    DRAW = 'DRAW',
    WIN1 = 'WIN1',
    WIN2 = 'WIN2',
}

function FighterSelected({ fighter }: { fighter: Fighters | undefined }): React.ReactElement {
    const { t } = useTranslation();

    return <Card>
        <CardContent>
            <Typography variant="h3" component="h2">
                Fighter selected
            </Typography>
            {fighter && <div><Typography color="primary" variant="h5" component="h5">
                {t('FIGHTERS.' + fighter)}
            </Typography></div>}
        </CardContent>
    </Card>;
}

interface GameResultInterface {
    result: GameResult
}
function GameResultCard({ result }: GameResultInterface): React.ReactElement {
    const dispatch = useDispatch();

    const { mode } = useSelector(
        (state: RootState) => state.game
    );

    return <Card>
        <CardContent>
            <Typography variant="h3" component="h2">
                {result === GameResult.DRAW && 'DRAW'}
                {result === GameResult.WIN1 && mode === GameMode.SINGLEPLAYER && 'HUMAN WON'}
                {result === GameResult.WIN1 && mode === GameMode.MULTIPLAYER && '1ST PLAYER WON'}
                {result === GameResult.WIN2 && mode === GameMode.SINGLEPLAYER && 'COMPUTER WON'}
                {result === GameResult.WIN2 && mode === GameMode.MULTIPLAYER && '2NT PLAYER WON'}
            </Typography>
        </CardContent>
        <CardActions>
            <Button color="secondary" onClick={() => { dispatch(setScreen(GameScreen.MENU)); }}>NEW GAME</Button>
        </CardActions>
    </Card>;
}

function Game(): React.ReactElement {
    const dispatch = useDispatch();
    const [gameResult, setGameResult] = useState<GameResult>();
    const [player1, setPlayer1] = useState<PlayerProps>();
    const [player2, setPlayer2] = useState<PlayerProps>();
    const [fighter1, setFighter1] = useState<{ fighter: Fighters, weight: number, dominate: number[] }>();
    const [fighter2, setFighter2] = useState<{ fighter: Fighters, weight: number, dominate: number[] }>();

    const { mode } = useSelector(
        (state: RootState) => state.game
    );

    useEffect(() => {
        if (!fighter1 || !fighter2) return;
        if (fighter1.weight === fighter2.weight) {
            return setGameResult(GameResult.DRAW);
        }
        if (fighter1.dominate.indexOf(fighter2.weight) !== -1) {
            return setGameResult(GameResult.WIN1);
        }
        setGameResult(GameResult.WIN2);
    }, [fighter1, fighter2]);

    useEffect(() => {
        setPlayer1({ type: PlayerType.HUMAN, id: 'player1', onSelect: setFighter1 });
    }, []);

    useEffect(() => {
        switch (mode) {
            case GameMode.SINGLEPLAYER as number:
                setPlayer2({ type: PlayerType.COMPUTER, id: 'player2', onSelect: setFighter2 });
                break;
            case GameMode.MULTIPLAYER as number:
                setPlayer2({ type: PlayerType.HUMAN, id: 'player2', onSelect: setFighter2 });
                break;
            default:
                dispatch(setError('1'));
        }
    }, [mode]);

    return (
        <Grid container spacing={3} id='game'>
            {player1 && <Grid item xs={6}>
                {!fighter1 && <Player {...player1} />}
                {fighter1 && (
                    <FighterSelected fighter={gameResult && fighter1.fighter} />
                )
                }
            </Grid>}
            {player2 && <Grid item xs={6}>
                {!fighter2 && <Player {...player2} />}
                {fighter2 && <FighterSelected fighter={gameResult && fighter2.fighter} />}
            </Grid>}
            {gameResult && <Grid item xs={12}><GameResultCard result={gameResult} /></Grid>}
        </Grid >
    );
}

export default Game;
