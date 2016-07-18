import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FavoritesComponent from '../../favorites/FavoritesComponent';
import * as favoritesActions from './favoritesActions';
import {play} from '../player/playerActions';

const Favorites = connect(
    state => {
        return {
            favorites: state.favorites
        }
    },
    dispatch => {
        return bindActionCreators(Object.assign(
            {},
            favoritesActions,
            {play}
        ), dispatch);
    }

)(FavoritesComponent);
export default Favorites;
