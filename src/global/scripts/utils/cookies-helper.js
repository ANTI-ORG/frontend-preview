import Cookies from "js-cookie";

const cookies = {
    accessToken: {
        cookieName: 'access_token',
        get: () => Cookies.get(cookies.accessToken.cookieName),
        set: (token) => Cookies.set(cookies.accessToken.cookieName, token, {expires: 7}),
        remove: () => Cookies.remove(cookies.accessToken.cookieName),
        check: () => !!cookies.accessToken.get(),
        use: (ifTrue, ifFalse = () => null) => cookies.accessToken.check() ? ifTrue(cookies.accessToken.get()) : ifFalse(),
    }
};

export default cookies;