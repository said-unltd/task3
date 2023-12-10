const { createHmac, } = require('node:crypto'); 


class Hmac {
    constructor(randomKey, computerMove) {
        this.randomKey = randomKey;
        this.computerMove = computerMove;
        this.token = '';
    }

    createEncription() {
        const hash = createHmac('sha256', this.randomKey).update(this.computerMove).digest('hex');
        this.token = hash.toUpperCase();
        return hash
    }
}

module.exports = Hmac;