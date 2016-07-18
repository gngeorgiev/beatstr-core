import BaseSearcher from './BaseSearcher';

export default class YouTubeSearcher extends BaseSearcher {
    constructor() {
        super('youtube.com', 'beatstr-core/res/youtube_logo.ico');
    }

    getSearchUrl(query) {
        return `https://www.youtube.com/results?q=${escape(query)}&sp=EgIQAQ%253D%253D`;
    }

    async search(query) {
        const icon = this.icon;
        const $ = await super.fetchHtml(query);
        //TODO: do we need to search more than the first page?
        const results = $('.yt-lockup-video').map((i, el) => {
            const $video = $(el);

            const $title = $video.find('a.yt-uix-tile-link');
            const title = $title.text();
            const url = `https://${this.domain}${$title.attr('href')}`;

            const id = url.split('v=')[1];
            const thumbnail = `https://i.ytimg.com/vi/${id}/hqdefault.jpg?custom=true&w=320&h=180&stc=true&jpg444=true&jpgq=90`;

            const $length = $video.find('.video-time');
            const length = $length.text();

            return {
                title, url, thumbnail, length, icon, id,
                source: 'YouTube'
            };
        }).toArray();

        return results;
    }
}
