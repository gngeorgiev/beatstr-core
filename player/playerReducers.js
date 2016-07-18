import {PLAY_TRACK, PLAYER_PAUSE, PLAYER_RESUME} from './playerActions';

export function currentTrack(state = {}, action) {
    if (action.type === PLAY_TRACK) {
        return action.track;
    }

    return state;
}

export function playing(state = false, action) {
    if (action.type === PLAYER_PAUSE) {
        return false;
    } else if (action.type === PLAYER_RESUME) {
        return true;
    }

    return state;
}
