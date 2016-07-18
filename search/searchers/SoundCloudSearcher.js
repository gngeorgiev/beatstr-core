import BaseSearcher from './BaseSearcher';
import {formatMilliseconds} from '../../player/playerUtils';

export default class SoundCloudSearcher extends BaseSearcher {
    constructor() {
        super('soundcloud.com', 'beatstr-core/res/soundcloud_logo.png');
    }

    getSearchUrl(query) {
        return `https://api-v2.soundcloud.com/search/tracks?q=${query}&facet=genre&client_id=02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea&limit=10`;
    }

    async search(query) {
        const icon = this.icon;
        const {collection} = await super.fetchJson(query);
        const results = collection.map(track => {
            const {
                artwork_url,
                permalink_url,
                duration,
                title,
                id
            } = track;

            return {
                title,
                icon,
                id,
                url: permalink_url,
                thumbnail: artwork_url,
                length: formatMilliseconds(duration),
                source: 'SoundCloud'
            }
        });

        return results;
    }
}
