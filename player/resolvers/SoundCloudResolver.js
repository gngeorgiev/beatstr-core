import BaseResolver from './BaseResolver';

export default class SoundCloudResolver extends BaseResolver {
    constructor() {
        super('soundcloud.com');
    }

    async resolve(track) {
        const res = await fetch(`http://api.soundcloud.com/resolve?url=${track.url}&client_id=02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea`);
        const {stream_url} = await res.json();
        return Object.assign({}, track, {
            streamUrl: `${stream_url}?client_id=02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea`
        });
    }
}