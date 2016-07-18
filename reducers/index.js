import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import * as commonReducers from './common';
import * as searchReducers from '../search/searchReducers';
import * as playerReducers from '../player/playerReducers';
import * as historyReducers from '../history/historyReducers';
import * as favoritesReducers from '../favorites/favoritesReducers';

const rootReducer = combineReducers(Object.assign(
    {},
    {routing},
    commonReducers,
    searchReducers,
    playerReducers,
    historyReducers,
    favoritesReducers
));

export default rootReducer;
