import {timeLeftToDate} from "./formatters.js";


class Storage {
    constructor(storage) {
        this.storage = storage;
        try {
            this.storage.setItem('test', 'test');
            this.storage.removeItem('test');
            this.exists = true;
        } catch (error) {
            console.error('Storage is not available');
            this.exists = false;
        }
    }

    setItem(key, value, options = {}) {
        if (this.exists) {
            if (options.expires) {
                if (
                    !!options.expires.days
                    && !!options.expires.hours
                    && !!options.expires.minutes
                    && !!options.expires.seconds
                ) {
                    options.expires = timeLeftToDate(options.expires);
                }
            }
            this.storage.setItem(key, {value, options});
        } else {
            console.error('Storage is not available');
        }
    }

    getItem(key) {
        if (this.exists) {
            return this.storage.getItem(key);
        } else {
            return null;
        }
    }

    removeItem(key) {
        if (this.exists) {
            this.storage.removeItem(key);
        } else {
            console.error('Storage is not available');
        }
    }

    checkItemIsValid(key) {
        const item = this.getItem(key);
        if (item) {
            if (!!item.options.expires) {
                const currentTime = new Date();
                const itemTime = item.options.expires;
                if (currentTime > new Date(itemTime)) {
                    this.removeItem(key);
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    }
}

const localStorage = new Storage(window.localStorage);
const sessionStorage = new Storage(window.sessionStorage);

export {localStorage, sessionStorage};