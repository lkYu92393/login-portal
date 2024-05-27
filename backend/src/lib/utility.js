const { createHash } = require('crypto')

function getCharArray() {
    const number = "1234567890";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";

    let text = '1234567890abcdefghijklmnopqrstuvwxyz';
    let output = "";
    for (let i = 0; i < 16; i++) {
        output += text.charAt(Math.floor(Math.random() * text.length));
    }
    return output;
}

function getSHA256HashPassword(password) {
    const hash = createHash('sha256').update(password).digest('hex')
    return hash
}

module.exports = { getCharArray, getSHA256HashPassword }