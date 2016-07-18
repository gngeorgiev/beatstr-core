export default class BaseResolver {
    constructor(domain) {
        this.domain = domain || 'not_supported';
    }

    resolve(track) {
        throw 'resolve method must be overriden';
    }
}
