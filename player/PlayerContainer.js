import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PlayerComponent from '../../player/PlayerComponent';
import * as playerActions from './playerActions';

function mapStateToProps(state) {
    const {currentTrack, playerTime, playing} = state;
    return {currentTrack, playerTime, playing}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(playerActions, dispatch);
}

const Player = connect(mapStateToProps, mapDispatchToProps)(PlayerComponent);
export default Player;
