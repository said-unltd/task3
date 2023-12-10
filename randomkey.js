const crypto = require('crypto');

class Key {
    constructor() {
        this.token = "";
    }

    generate() {
        const script = crypto.randomBytes(32).toString('hex');
        this.token = script.toUpperCase();
        return script.toUpperCase();
    }
}

module.exports = Key;