import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../rootReducer';
import { PlayerType, GameDifficulty, GameInterface, NormalGame, HardGame, Fighters } from '../types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { uniqueNamesGenerator, Config, adjectives, animals } from 'unique-names-generator';

const useStyles = makeStyles((theme) => ({
    fighters: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const customConfig: Config = {
    dictionaries: [adjectives, animals],
    separator: ' ',
    length: 2,
};

export interface PlayerProps {
    type: PlayerType,
    id: string,
    onSelect: (value: { fighter: Fighters, weight: number, dominate: number[] }) => void,
}

function Player({ type, id, onSelect }: PlayerProps): React.ReactElement {
    const { t } = useTranslation();
    const classes = useStyles();
    const [name, setName] = useState<string>();
    const [game, setGame] = useState<GameInterface>();
    const [fighters, setFighters] = useState<JSX.Element>();

    const { dificulty } = useSelector(
        (state: RootState) => state.game
    );

    useEffect(() => {
        switch (type) {
            case PlayerType.HUMAN:
                setName(uniqueNamesGenerator(customConfig));
                break;
            case PlayerType.COMPUTER:
                setName(t('COMPUTER'));
                break;
        }
    }, [type]);

    useEffect(() => {
        switch (dificulty) {
            case GameDifficulty.NORMAL:
                setGame(new NormalGame());
                break;
            case GameDifficulty.HARD:
                setGame(new HardGame());
                break;
        }
    }, [dificulty]);

    useEffect(() => {
        if (!game || type === PlayerType.COMPUTER) return setFighters(<div></div>);
        setFighters(<div className={classes.fighters}>{game.fighters.sort((a, b) => a.weight - b.weight).map(f => <Button variant="contained" color="secondary" key={f.fighter} onClick={() => { onSelect(f); }}>{t(`FIGHTERS.${f.fighter}`)}</Button>)}</div>);
    }, [game, type]);

    useEffect(() => {
        if (!game) return;
        if (type === PlayerType.COMPUTER) {
            setTimeout(() => { onSelect(game.fighters[Math.floor(Math.random() * game.fighters.length)]); }, 1000);
        }
    }, [type, game]);

    return (
        <Card id={id} className={`player-${type}`}>
            <CardContent>
                <Typography variant="h4" component="h4">
                    {id}
                </Typography>
                <Typography variant="h3" component="h4">
                    {name}
                </Typography>
            </CardContent>
            {type === PlayerType.HUMAN && (<CardContent>
                <Typography variant="h6" component="span">
                    {t('SELECT_FIGHTER')}
                </Typography>
                {fighters}
            </CardContent>)}
            {type === PlayerType.COMPUTER && (<CardContent>
                <Typography variant="h6" component="span">
                    {t('COMPUTER_SELECT_FIGHTER')}
                </Typography>
                <div><CircularProgress color="secondary" /></div>
            </CardContent>
            )}
        </Card>
    );
}

export default Player;
