import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import HistoryComponent from '../../history/HistoryComponent';
import {play} from '../player/playerActions';
import * as historyActions from './historyActions';
import * as favoritesActions from '../favorites/favoritesActions';

const History = connect(state => {
    return {
        history: state.history
    }
}, dispatch => {
    return bindActionCreators(Object.assign(
        {},
        {play},
        historyActions,
        favoritesActions
    ), dispatch);
})(HistoryComponent);
export default History;
