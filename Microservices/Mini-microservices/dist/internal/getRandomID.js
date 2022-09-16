"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};
const getRandomASCIIDigit = () => {
    return String.fromCharCode(getRandomNumber(33, 127));
};
const generateRandomID = (digits) => {
    if (typeof digits !== 'number' || digits > 200 || digits < 1) {
        throw new Error('digits must be a number between 1 and 200');
    }
    const id = [];
    for (let i = 0; i < digits; i++) {
        id.push(getRandomASCIIDigit());
    }
    return id.join('');
};
exports.default = generateRandomID;
