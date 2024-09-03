const TEST_NEW_API = false;


class UserAPI {
    base_url = 'https://anti-social-production-b971.up.railway.app/';

    generatedOptions = (method, acceptOption, body, token) => {
        const acceptOptions = {
            json: 'application/json',
        }
        const options = {
            method: method,
            headers: {
                accept: acceptOptions[acceptOption],
            }
        }
        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }
        if (body) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        }
        return options;
    }

    buildRequest = (args, params) => {
        let url = this.base_url + args.join('/');
        if (params) {
            url += '?' + new URLSearchParams(params).toString();
        }
        return url;
    };

    getJsonResponse = async (
        method,
        acceptOption,
        token,
        args,
        params = null,
        body = null
    ) => {
        try {
            const response = await fetch(
                this.buildRequest(args, params, body),
                this.generatedOptions(method, acceptOption, body, token)
            ).then(response => response.json());
            if (
                response.status === 400
                || response.status === 405
                || response.status === 422
            ) {
                return null;
            }
            return response;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };

    getOnline = async () => {
        return await this.getJsonResponse(
            'GET',
            'json',
            null,
            ['users', 'get-online']
        );
    }

    generateNonce = async (address) => {
        return await this.getJsonResponse(
            'POST',
            'json',
            null,
            ['auth', 'web3', 'generate-nonce'],
            {address: address}
        );
    }

    verifySignature = async (tempToken, signature, type) => {
        return await this.getJsonResponse(
            'POST',
            'json',
            null,
            ['auth', 'web3', 'verify-signature'],
            {type: type},
            {
                temp_token: tempToken,
                signature: signature
            }
        );
    }

    authIsValid = async (token) => {
        return await this.getJsonResponse(
            'GET',
            'json',
            token,
            ['auth', 'web3', 'is-valid']
        );
    }

    deactivateToken = async (token) => {
        return await this.getJsonResponse(
            'DELETE',
            'json',
            token,
            ['auth', 'web3', 'deactivate']
        );
    }

    getUser = async (token) => {
        return await this.getJsonResponse(
            'GET',
            'json',
            token,
            ['user']
        );
    }

    updateUser = async (token, userData) => {
        return await this.getJsonResponse(
            'PATCH',
            'json',
            token,
            ['user'],
            userData
        );
    }

    grabDocs = async (token) => {
        return await this.getJsonResponse(
            'PATCH',
            'json',
            token,
            ['docs', 'grab']
        );
    }

    checkDocsStatus = async (token) => {
        return await this.getJsonResponse(
            'GET',
            'json',
            token,
            ['docs', 'check-status']
        );
    }

    getQuests = async () => {
        return await this.getJsonResponse(
            'GET',
            'json',
            null,
            ['quests']
        );
    }

    getQuest = async (questId) => {
        return await this.getJsonResponse(
            'GET',
            'json',
            null,
            ['quest', questId]
        );
    }

    getChains = async () => {
        return await this.getJsonResponse(
            'GET',
            'json',
            null,
            ['chains']
        );
    }

    getChain = async (chainId) => {
        return await this.getJsonResponse(
            'GET',
            'json',
            null,
            ['chain', chainId]
        );
    }

    getProjects = async () => {
        return await this.getJsonResponse(
            'GET',
            'json',
            null,
            ['projects']
        );
    }

    getProject = async (projectId) => {
        return await this.getJsonResponse(
            'GET',
            'json',
            null,
            ['project', projectId]
        );
    }
}

class UserAPIBeta {
    base_url = 'https://anti-social-production-b971.up.railway.app/';

    generatedOptions = (method, acceptOption, body, token, noCors) => {
        const acceptOptions = {
            json: 'application/json',
        }
        const options = {
            method: method,
        }
        if (!noCors) {
            options.headers['Accept'] = acceptOptions[acceptOption];
            if (token) {
                options.headers['Authorization'] = `Bearer ${token}`;
            }
            if (body) {
                options.headers['Content-Type'] = 'application/json';
                options.body = JSON.stringify(body);
            }
        } else {
            options.mode = 'no-cors';
        }
        return options;
    }

    buildRequest = (args, params) => {
        let url = this.base_url + args.join('/');
        if (params) {
            url += '?' + new URLSearchParams(params).toString();
        }
        return url;
    };

    getJsonResponse = async (
        method,
        acceptOption,
        token,
        args,
        params = null,
        body = null,
        noCors = false
    ) => {
        return await fetch(
            this.buildRequest(args, params, body),
            this.generatedOptions(method, acceptOption, body, token, noCors)
        )
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching data:', error);
                return null;
            });
    };

    pingServer = async () => {
        return await this.getJsonResponse(
            'HEAD',
            'json',
            null,
            null,
            null,
            null,
            true
        );
    }

    apiContainer = {
        slots: {

        },
        updateSlot: (name) => {
            self[name].contentOrigin()
            self[name].updateTime = Date.now()
        }
    };
}

let userAPI = TEST_NEW_API ? new UserAPIBeta() : new UserAPI();

export default userAPI;