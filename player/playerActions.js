import {LOADING_ACTION} from '../reducers/common';
import {getResolver} from './resolve';
import {addToHistory} from '../history/historyActions';
import {head, findIndex, chain, clone} from 'lodash';
import store from '../store/store';

export const PLAY_TRACK = 'PLAY_TRACK';
export const PLAY_SOURCE_SEARCH = 'PLAY_SOURCE_SEARCH';
export const PLAY_SOURCE_HISTORY = 'PLAY_SOURCE_HISTORY';
export const PLAY_SOURCE_FAVORITES = 'PLAY_SOURCE_FAVORITES';

export function play(track, playSource) {
    return async dispatch => {
        dispatch({
            type: LOADING_ACTION,
            loading: true
        });

        try {
            const resolver = getResolver(track);
            const resolvedTrack = await resolver.resolve(track);
            resolvedTrack.date = new Date();
            resolvedTrack.playSource = playSource;
            if (resolvedTrack.playSource === PLAY_SOURCE_SEARCH) {
                resolvedTrack.playSourceSnapshot = clone(store.getState().searchResults);
            } else {
                resolvedTrack.playSourceSnapshot = {};
            }

            if (resolvedTrack.playSource !== PLAY_SOURCE_HISTORY) {
                addToHistory(resolvedTrack)(dispatch);
            }

            dispatch({
                type: PLAY_TRACK,
                track: resolvedTrack
            });
        } catch (e) {
            console.error(e);
        } finally {
            dispatch({
                type: LOADING_ACTION,
                loading: false
            });
        }
    };
}

export const PLAYER_PAUSE = 'PLAYER_PAUSE';
export function pause() {
    return dispatch => {
          dispatch({
              type: PLAYER_PAUSE
          });
    };
}

export const PLAYER_RESUME = 'PLAYER_RESUME';
export function resume() {
    return dispatch => {
        dispatch({
            type: PLAYER_RESUME
        });
    }
}

export function playNext(previousTrack) {
    return dispatch => {
        let source = null;
        switch (previousTrack.playSource) {
            case PLAY_SOURCE_SEARCH:
                source = previousTrack.playSourceSnapshot[previousTrack.source];
                break;
            case PLAY_SOURCE_FAVORITES:
                source = chain(store.getState().favorites.Favorites)
                    .clone()
                    .reverse()
                    .value();
                break;
            case PLAY_SOURCE_HISTORY:
                source = chain(store.getState().history)
                    .values()
                    .flatten()
                    .value();
                break;
        }

        const trackIndex = findIndex(source, f => f.id === previousTrack.id);
        let nextTrack = null;
        if (trackIndex === source.length - 1) {
            nextTrack = head(source);
        } else {
            nextTrack = source[trackIndex + 1];
        }

        return play(nextTrack, previousTrack.playSource)(dispatch);
    };
}
