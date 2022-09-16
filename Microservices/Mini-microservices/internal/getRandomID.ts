
const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const getRandomASCIIDigit = () => {
    // ASCII printable characters (character code 33-127)
    return String.fromCharCode(getRandomNumber(33, 127))
}

const generateRandomID = (digits: number): string => {
    if (typeof digits !== 'number' || digits > 200 || digits < 1) {
        throw new Error('digits must be a number between 1 and 200')
    }

    const id = []

    for(let i = 0; i < digits; i++) {
        id.push(getRandomASCIIDigit())
    }

    return id.join('')
}

export default generateRandomID