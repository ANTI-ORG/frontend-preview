import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import cookies from "./utils/cookies-helper.js";


class UserAPI {
    base_url = 'https://anti-backend-production.up.railway.app/';

    nullResponses = {
        SWR: () => ({data: null, isLoading: false})
    };

    generatedOptions = (method, acceptOption, token, body) => {
        const acceptOptions = {
            json: 'application/json',
            default: 'application/json',
        };
        const options = {
            method: method,
            headers: {
                Accept: acceptOptions[acceptOption],
            },
        };
        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }
        if (body && Object.keys(body).length > 0) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        }

        return options;
    };

    buildRequest = (args, params) => {
        let url = this.base_url + args.join('/');
        if (params && Object.keys(params).length > 0) {
            url += '?' + new URLSearchParams(params).toString();
        }
        return url;
    };

    fetchSWR = (
        {
            method,
            args,
            acceptOption = 'json',
            token = null,
            params = {},
            body = {},
            immutable = false,
            swrOptions = {},
        }
    ) => {
        const fetcher = ({request, options}) =>
            fetch(request, options)
                .then(res => res.json())
                .catch(() => {
                    options.Authorization ? cookies.accessToken.remove() : null
                });

        const swrHook = immutable ? useSWRImmutable : useSWR;
        return swrHook(
            {
                request: this.buildRequest(args, params),
                options: this.generatedOptions(method, acceptOption, token, body)
            },
            fetcher,
            swrOptions
        );
    };

    fetchAsync = async (
        {
            method,
            args,
            acceptOption = 'json',
            token = null,
            params = {},
            body = {},
        }
    ) => {
        return await fetch(
            this.buildRequest(args, params),
            this.generatedOptions(method, acceptOption, token, body)
        )
            .then(res => acceptOption === 'json' ? res.json() : () => {});
    };

    users = {
        getOnline: () =>
            this.fetchSWR({
                method: 'GET',
                args: ['users', 'get-online'],
                swrOptions: {refreshInterval: 5000}
            })
    };

    auth = {
        generateNonce: async (address) =>
            await this.fetchAsync({
                method: 'POST',
                args: ['auth', 'web3', 'generate-nonce'],
                params: {address: address},
            }),
        verifySignature: async (tempToken, signature, type) =>
            await this.fetchAsync({
                method: 'POST',
                args: ['auth', 'web3', 'verify-signature'],
                params: {type: type},
                body: {
                    temp_token: tempToken,
                    signature: signature
                },
            }),
        isValid: async () =>
            cookies.accessToken.useAsync(async token =>
                await this.fetchAsync({
                    method: 'GET',
                    args: ['auth', 'web3', 'is-valid'],
                    token: token,
                })
            ),
        deactivateToken: async () =>
            cookies.accessToken.useAsync(async token =>
                await this.fetchAsync({
                    method: 'DELETE',
                    args: ['auth', 'web3', 'deactivate'],
                    acceptOption: '',
                    token: token,
                })
            )
    };

    user = {
        get: () =>
            cookies.accessToken.use(token => {
                    return this.fetchSWR({
                        method: 'GET',
                        args: ['user'],
                        token: token,
                        swrOptions: {refreshInterval: 30000}
                    });
                },
                this.nullResponses.SWR
            ),
        patch: async (userData) =>
            cookies.accessToken.useAsync(async token =>
                await this.fetchAsync({
                    method: 'PATCH',
                    args: ['user'],
                    token: token,
                    body: userData,
                })
            )
    };

    docs = {
        grab: async () =>
            cookies.accessToken.useAsync(async token =>
                await this.fetchAsync({
                    method: 'PATCH',
                    args: ['docs', 'grab'],
                    token: token,
                })
            ),
        checkStatus: () =>
            cookies.accessToken.use(token => {
                    return this.fetchSWR({
                        method: 'GET',
                        args: ['docs', 'check-status'],
                        token: token,
                        immutable: true
                    });
                },
                this.nullResponses.SWR
            )
    };

    quests = {
        get: (questId = null) => {
            const args = !!questId ? ['quests', questId] : ['quests'];
            return this.fetchSWR({
                method: 'GET',
                args: args,
                immutable: true
            });
        }
    };

    chains = {
        get: (chainId = null) => {
            const args = !!chainId ? ['chains', chainId] : ['chains'];
            return this.fetchSWR({
                method: 'GET',
                args: args,
                immutable: true
            });
        }
    };

    projects = {
        get: (projectId = null) => {
            const args = !!projectId ? ['projects', projectId] : ['projects'];
            return this.fetchSWR({
                method: 'GET',
                args: args,
                immutable: true
            });
        }
    };
}

let userAPI = new UserAPI();

export default userAPI;