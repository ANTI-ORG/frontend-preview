const sum = (list) => {
    return list.reduce((a, b) => a + b, 0);
}

const dataLoaded = (data) => {
    for (const index in data) {
        if (data[index] === null) {
            return false;
        }
        try {
            if (data[index].length === 0) {
                return false;
            }
        }
        catch (error) {}
    }
    return true;
};

const insertCharIn = (string, index, char) => {
    return string.slice(0, index) + char + string.slice(index);
};

const unixTimesptampToTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
};

const formatUsername = (username) => {
    const maxLenght = 10;
    if (username.length > maxLenght) {
        return `${username.slice(0, maxLenght)}...`;
    }
    else {
        return username;
    }
};

const formatWalletAddress = (address) => {
    if (!address) {
        return 'No wallet connected';
    }
    else {
        return `${address.slice(0, 5)}...${address.slice(-5)}`;
    }
};

const formatDatetime = (datetime) => {
    const date = new Date(datetime);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
};

const splitCSSValue = (inputStr) => {
    if (
        inputStr === undefined
        || inputStr === null
        || inputStr === ''
    ) {
        return [0, ''];
    }

    const match = inputStr.match(/^(\d+(\.\d+)?)(\D*)$/);

    if (match) {
        return [parseFloat(match[1]), match[3] || ''];
    } else {
        return null;
    }
};

const assembleCSSValue = (arr) => {
    if (arr && arr.length > 0) {
        return arr[0].toString() + (arr[1] || '');
    } else {
        return null;
    }
};

const sumCSSValues = (value1, value2) => {
    console.log('Summing CSS values:', value1, value2);
    const value1Split = splitCSSValue(value1);
    const value2Split = splitCSSValue(value2);
    console.log('Split values:', value1Split, value2Split);

    if (
        (value1Split[0] === 0 && value1Split[1] === '')
        || (value1Split[1] === value2Split[1])
    ) {
        const newValue = value1Split[0] + value2Split[0];
        return assembleCSSValue([newValue, value1Split[1] || value2Split[1] || '']);
    } else {
        console.error('CSS units must be the same');
        return null;
    }
};

const percentageToColor = (percentage) => {
    return {
        r: Math.min(255, Math.round(2 * (1 - percentage) * 255)),
        g: Math.min(255, Math.round(2 * percentage * 255)),
        b: 0
    };
};

export {
    sum,
    dataLoaded,
    unixTimesptampToTime,
    insertCharIn,
    formatUsername, formatWalletAddress, formatDatetime,
    splitCSSValue, assembleCSSValue, sumCSSValues,
    percentageToColor
};