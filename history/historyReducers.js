import {groupBy, chain, keys} from 'lodash';
import moment from 'moment';
import {STORE_HISTORY_ADD, STORE_HISTORY_REMOVE, STORE_HISTORY_INITIALIZED} from '../datastore/datastore';

const TODAY = 'Today';
const LAST_7_DAYS = 'Last 7 days';
const LAST_30_DAYS = 'Last 30 days';
const LAST_YEAR = 'Last year';
const OLDER_THAN_YEAR = 'Older than an year';

export function history(state = {}, action) {
    if (action.type === STORE_HISTORY_ADD ||
        action.type === STORE_HISTORY_REMOVE ||
        action.type === STORE_HISTORY_INITIALIZED) {
        const {history} = action;

        const today = new Date();
        const groups = groupBy(history, track => {
            const {date} = track;
            const dateMoment = moment(date);

            if (dateMoment.isSame(today, 'day')) {
                return TODAY;
            } else if (moment(today).subtract(7, 'days').isBefore(dateMoment)) {
                return LAST_7_DAYS;
            } else if (dateMoment.isSame(today, 'month')) {
                return LAST_30_DAYS;
            } else if (dateMoment.isSame(today, 'year')) {
                return LAST_YEAR;
            }

            return OLDER_THAN_YEAR;
        });

        keys(groups).forEach(g => {
            groups[g] = chain(groups[g]).sortBy(t => new Date(t.date)).reverse().value();
        });

        return groups;
    }

    return state;
}
