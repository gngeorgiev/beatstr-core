import store from '../store/store';
import {defaults} from 'lodash';
import {
    STORE_SEARCH_DATA_INITIALIZED,
    STORE_HISTORY_INITIALIZED,
    STORE_FAVORITES_INITIALIZED
} from './events';
import {merge} from 'lodash';
import Adapter from '../../datastore/Adapter';

export default class LocalDataStore {
    constructor() {
        this.adapter = new Adapter();
        this._storageKey = '_';
        this.state = defaults(this.restore(), {
            history: {},
            search: {},
            favorites: {},
            settings: {
                player: {
                    volume: 100
                }
            }
        });

        store.dispatch({
            type: STORE_HISTORY_INITIALIZED,
            history: this.state.history
        });

        store.dispatch({
            type: STORE_SEARCH_DATA_INITIALIZED,
            searchHistory: this.state.search
        });

        store.dispatch({
            type: STORE_FAVORITES_INITIALIZED,
            favorites: this.state.favorites
        });
    }
    save() {
        this.adapter.set(this._storageKey, this.state);
    }

    restore() {
        return this.adapter.get(this._storageKey);
    }

    addToHistory(track) {
        this.state.history[track.id] = track;
        this.save();
    }

    removeFromHistory(track) {
        if (!this.state.history[track.id]) {
            return;
        }

        delete this.state.history[track.id];
        this.save();
    }

    addToSearch(record) {
        this.state.search[record] = 1;
        this.save();
    }

    addToFavorites(track) {
        this.state.favorites[track.id] = track;
        this.save();
    }

    removeFromFavorites(track) {
        if (!this.state.favorites[track.id]) {
            return;
        }

        delete this.state.favorites[track.id];
        this.save();
    }

    applySettings(settings) {
        this.state.settings = merge(this.state.settings, settings);
        this.save();
    }
}
