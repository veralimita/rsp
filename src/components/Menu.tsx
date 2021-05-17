import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { GameScreen, GameMode } from '../types';
import { setScreen, setMode } from '../slice';
import singleplayerImage from '../static/singleplayer.jpeg';
import multiplayerImage from '../static/multiplayer.jpeg';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: '0 auto'
    },
    media: {
        height: 140,
    },
});

export interface MenuItemProps {
    mode: GameMode;
    title: string;
    description: string;
    image: string;
}

export function MenuItem({ title, description, image, mode }: MenuItemProps): React.ReactElement {
    const classes = useStyles();
    const dispatch = useDispatch();

    const startGame = () => {
        dispatch(setScreen(GameScreen.GAME));
        dispatch(setMode(mode));
    };

    return (
        <Card className={classes.root} id={`startGame${mode}`}>
            <CardMedia
                className={classes.media}
                image={image}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={startGame} size="small" color="secondary">Start</Button>
            </CardActions>
        </Card>
    );
}

function Menu(): React.ReactElement {
    const { t } = useTranslation();

    const versions: Array<MenuItemProps> = [
        {
            mode: GameMode.SINGLEPLAYER,
            title: t('SINGLEPLAYER'),
            description: t('SINGLEPLAYER_DESC'),
            image: singleplayerImage
        },
        {
            mode: GameMode.MULTIPLAYER,
            title: t('MULTIPLAYER'),
            description: t('MULTIPLAYER_DESC'),
            image: multiplayerImage
        }
    ];

    return (
        <Grid container spacing={3} id='menu'>
            {versions.map(version => (<Grid item xs={6} key={version.mode}>
                <MenuItem  {...version} />
            </Grid>))}
        </Grid>
    );
}

export default Menu;
