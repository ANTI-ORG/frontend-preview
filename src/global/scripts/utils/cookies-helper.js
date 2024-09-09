import Cookies from "js-cookie";

const cookies = {
    accessToken: {
        cookieName: 'access_token',
        get: () => Cookies.get(cookies.accessToken.cookieName),
        set: (token) => Cookies.set(cookies.accessToken.cookieName, token, {expires: 7}),
        remove: () => Cookies.remove(cookies.accessToken.cookieName),
        check: () => !!cookies.accessToken.get(),
        use: (
            ifExists,
            ifNot = () => {}
        ) => {
            return cookies.accessToken.check() ? ifExists(cookies.accessToken.get()) : ifNot()
        },
        useAsync: async (
            ifExists,
            ifNot = async () => {}
        ) => {
            return cookies.accessToken.check() ? await ifExists(cookies.accessToken.get()) : await ifNot()
        }
    }
};

export default cookies;