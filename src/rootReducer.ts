import { combineReducers } from '@reduxjs/toolkit';
import game from './slice';

const rootReducer = combineReducers({ game });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
