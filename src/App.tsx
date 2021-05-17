import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './rootReducer';
import { GameScreen, GameDifficulty } from './types';
import { setDificulty, setError } from './slice';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Menu from './components/Menu';
import Game from './components/Game';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  container: {
    padding: '1em'
  }
}));

type LayoutMap = {
  [index in GameScreen]: JSX.Element;
};

const layoutMap: LayoutMap = {
  [GameScreen.MENU]: <Menu />,
  [GameScreen.GAME]: <Game />,
};

function App(): React.ReactElement {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [layout, setLayout] = useState<JSX.Element>(<Menu />);

  const { screen, dificulty, error } = useSelector(
    (state: RootState) => state.game
  );

  const changeGameDifficulty = useCallback(() => {
    if (screen !== GameScreen.MENU) return dispatch(setError('0'));
    switch (dificulty) {
      case GameDifficulty.HARD:
        dispatch(setDificulty(GameDifficulty.NORMAL));
        break;
      case GameDifficulty.NORMAL:
        dispatch(setDificulty(GameDifficulty.HARD));
        break;
    }
  }, [dificulty, screen]);

  useEffect(() => {
    setLayout(layoutMap[screen]);
  }, [screen]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {t('APP_TITLE')}
          </Typography>
          <Button onClick={changeGameDifficulty} variant="contained" color="secondary">
            {t(`MODE.${dificulty}`)}
          </Button>
        </Toolbar>
      </AppBar>
      {error && <Alert severity="error" color="error">
        {t(`ERRORS.${error}`)}
      </Alert>}
      <Container className={classes.container}>
        {layout}
      </Container>
    </div>
  );
}

export default App;
