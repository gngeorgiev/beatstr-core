import YouTubeResolver from './resolvers/YouTubeResolver';
import SoundCloudResolver from './resolvers/SoundCloudResolver';
import {find} from 'lodash';

const SUPPORTED_RESOLVERS = [
    new YouTubeResolver(),
    new SoundCloudResolver()
];

export function getResolver(resource) {
    return find(SUPPORTED_RESOLVERS, r => resource.url.includes(r.domain));
}
