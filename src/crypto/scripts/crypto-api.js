class CoinStatsAPI {
    base_url = 'https://openapiv1.coinstats.app/';
    tokens = [
        '0znvm1ZsKpVB4WmILaQvY793EKKmFjvX7SEfDAAD1DE=',
        '1m6MNyiLXfKsziA1Yz0ss6Xg5vXNQVGh2lQzHrqUnXQ=',
        '9GiMQkRxuvawqOCNndLhdnMOMPJCM3TullPEWsHotUM=',
        '9y0kqkDhyW/JHQ694IR2SexWmqWXUpSIuLw60am/kOA=',
        '4ICezZqW8xOcjnFoDAh7pOJZkGDHNvkP8xuIPm7dphI=',
        'LOAIj/t0Slevb+7l1X+twAgr6hD1lBD28icXFIc9n7M=',
        'DuPu0qNXta2u2mBHnbnSLYCAgtXtmWVmXUJjEtYRJm0='
    ];
    activeTokenIndex = 0;

    updateRequestCounter = () => {
        this.activeTokenIndex++;
        if (this.activeTokenIndex === this.tokens.length) {
            this.activeTokenIndex = 0;
        }
    }

    generatedOptions = () => {
        return ({
            method: 'GET',
            headers: {
                accept: 'application/json',
                'X-API-KEY': this.tokens[this.activeTokenIndex]
            }
        });
    }

    buildRequest = (args, params) => {
        let url = this.base_url + args.join('/');
        if (params) {
            url += '?' + new URLSearchParams(params).toString();
        }
        return url;
    };

    getJsonResponse = async (args, params = null, fromResult = false) => {
        try {
            const response = await fetch(
                this.buildRequest(args, params),
                this.generatedOptions()
            ).then(response => response.json());
            this.updateRequestCounter();
            if (response.hasOwnProperty('statusCode')) {
                if (response.statusCode === 400 || response.statusCode === 401) {
                    return null;
                }
            }
            if (fromResult && response.hasOwnProperty('result')) {
                return response.result;
            } else {
                return response;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };

    getCoinInfo = async (coinId) => {
        return await this.getJsonResponse(['coins', coinId]);
    };

    getCoins = async (limit, fromResult = false) => {
        return await this.getJsonResponse(['coins'], {limit: limit}, fromResult);
    };

    getCoinCharts = async (coinId, period) => {
        return await this.getJsonResponse(['coins', coinId, 'charts'], {period: period});
    };

    getMarkets = async () => {
        return await this.getJsonResponse(['markets']);
    }
}

const coinStatsAPI = new CoinStatsAPI();

export default coinStatsAPI;