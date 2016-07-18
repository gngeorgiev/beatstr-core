import BaseResolver from './BaseResolver';
import {find} from 'lodash';
import ytdl from 'ytdl-core';

export default class YouTubeResolver extends BaseResolver {
    constructor() {
        super('youtube.com');
    }

    resolve(track) {
        const {url} = track;

        return new Promise((resolve, reject) => {
            ytdl.getInfo(url, (err, info) => {
                if (err) {
                    return reject(err);
                }

                try {
                    const format = find(info.formats, format => format.container === 'mp4' && !format.resolution && format.type.includes('audio/'));
                    const {url} = format;

                    return resolve(Object.assign({}, track, {
                        streamUrl: url
                    }));
                } catch (e) {
                    return reject(e);
                }
            });
        });
    }
}
