import YouTubeSearcher from './YouTubeSearcher';
import SoundCloudSearcher from './SoundCloudSearcher';

const searchers = {
    youTube: new YouTubeSearcher(),
    soundCloud: new SoundCloudSearcher()
};

export default searchers;