"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};
var getRandomASCIIDigit = function () {
    // ASCII printable characters (character code 33-127)
    return String.fromCharCode(getRandomNumber(33, 127));
};
var getRandomID = function (digits) {
    if (typeof digits !== 'number' || digits > 200 || digits < 1) {
        throw new Error('digits must be a number between 1 and 200');
    }
    var id = [];
    for (var i = 0; i < digits; i++) {
        id.push(getRandomASCIIDigit());
    }
    return id.join('');
};
exports.default = getRandomID;
