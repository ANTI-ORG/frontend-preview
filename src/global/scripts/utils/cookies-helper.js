import Cookies from "js-cookie";


class Cookie {
    constructor(name, expires = -1) {
        this.cookieName = name;
        this.expires = expires;
    }

    set(value) {
        Cookies.set(this.cookieName, value, {expires: this.expires});
    }

    get() {
        return Cookies.get(this.cookieName);
    }

    remove() {
        Cookies.remove(this.cookieName);
    }

    checkIsValid() {
        return !!this.get();
    }

    use(ifExists, ifNot = () => {}) {
        return this.checkIsValid() ? ifExists(this.get()) : ifNot();
    }

    async useAsync(ifExists, ifNot = async () => {}) {
        return this.checkIsValid() ? await ifExists(this.get()) : await ifNot()
    }
}

const cookies = {
    accessToken: new Cookie('access_token', 7),
};

export default cookies;