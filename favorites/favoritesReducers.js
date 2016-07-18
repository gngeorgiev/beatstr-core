import {
    STORE_FAVORITES_ADD,
    STORE_FAVORITES_REMOVE,
    STORE_FAVORITES_INITIALIZED
} from '../datastore/datastore';
import {chain} from 'lodash';

export function favorites(state = {}, action) {
    if (action.type === STORE_FAVORITES_ADD ||
        action.type === STORE_FAVORITES_REMOVE ||
        action.type === STORE_FAVORITES_INITIALIZED) {
        return {
            Favorites: chain(action.favorites).toArray().sortBy(a => new Date(a.date)).value()
        }
    }

    return state;
}
