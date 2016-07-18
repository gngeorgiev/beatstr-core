import cheerio from 'cheerio';

export default class BaseSearcher {
    constructor(domain, icon) {
        this.domain = domain;
        this.icon = icon;
    }

    getSearchUrl(query) {
        throw 'getSearchUrl must be overriden';
    }

    _fetch(query) {
        const searchUrl = this.getSearchUrl(query);
        return fetch(searchUrl);
    }

    async fetchJson(query) {
        const res = await this._fetch(query);
        return await res.json();
    }

    async fetchHtml(query) {
        const res = await this._fetch(query);
        const html = await res.text();
        return cheerio.load(html);
    }

    search(query) {
        throw 'search must be overriden';
    }
}