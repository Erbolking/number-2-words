/**
 * @param {number} num
 * @return {string}
 */
var numberToWords = function(num) {
    if (num === 0) {
        return 'Zero';
    }
    let result = '';
    let numbers = num.toString();
    let trio = '';
    for (let i = numbers.length - 1; i >= 0; i--) {
        trio = numbers[i] + trio;
        if (trio.length === 3) {
            let addSpaceIfNeeded = result.length ? ' ' : ''
            let toAdd = getNameOfTreeDigitPart(trio);
            const rang = naming[numbers.length - i - 3];
            if (rang) {
                toAdd += " " + rang;
            }
            result = toAdd + addSpaceIfNeeded + result;
            trio = '';
        }
    }
    
    if (trio) {
        let addSpaceIfNeeded = result.length ? ' ' : ''
        let toAdd = getNameOfTreeDigitPart(trio);
        const rang = naming[numbers.length - trio.length];
        if (rang) {
            toAdd += " " + rang;
        }
        result = toAdd + addSpaceIfNeeded + result;
        trio = '';
    }
    
    return result;
};

var digitMap = {
    '1': 'One',
    '2': 'Two',
    '3': 'Three',
    '4': 'Four',
    '5': 'Five',
    '6': 'Six',
    '7': 'Seven',
    '8': 'Eight',
    '9': 'Nine',
    '0': ''
};

var exceptions = {
    '10': 'Ten',
    '11': 'Eleven',
    '12': 'Twelve',
    '13': 'Thirteen',
    '14': 'Fourteen',
    '15': 'Fifteen',
    '18': 'Eighteen'
};

var prefixExceptions = {
    '2': 'Twen',
    '3': 'Thir',
    '4': 'For',
    '5': 'Fif',
    '8': 'Eigh'
};

var naming = {
    '3': 'Thousand',
    '6': 'Million',
    '9': 'Billion'
}

var getNameOfTreeDigitPart = function (string) {
    let result = '';

    if (string.length > 2) {
        const hundredPart = digitMap[string[0]] + ' Hundred';
        const decimalPart = getNameOfTwoDigitPart(string.slice(1));
        
        result += hundredPart;
        // add space if decimalPart present
        if (decimalPart.length) {
            result += ' ';
        }
        result += decimalPart;
    } else {
        result += getNameOfTwoDigitPart(string);
    }
    
    return result;
};

var getNameOfTwoDigitPart = function (string) {
    if (string.length === 1) {
        return digitMap[string[0]];
    }
    const first = string[0];
    const second = string[1];
    
    if (exceptions[string]) {
        return exceptions[string];
    }
    
    let suffix = first === '1' ? 'teen' : 'ty';
    if (first === '0') {
        suffix = '';
    }
    
    if (first === '1') {
        const base = digitMap[second];
        return `${base}${suffix}`;
    } else {
        const base = prefixExceptions[first] ? prefixExceptions[first] : digitMap[first];
        let spaceIfNeeded = digitMap[second] && suffix ? ' ' : '';
        return `${base}${suffix}${spaceIfNeeded}${digitMap[second]}`;
    }
};
