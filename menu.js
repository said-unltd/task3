const { exit } = require("node:process");

class Menu {
    constructor(moves) {
        this.moves = moves;
        this.userChoice = '';
    }

    showMenu() {
        console.log('Available moves:')
        for (let i = 0; i < this.moves.length; i++) {
            console.log(`${i+1} - ${this.moves[i]}`)
        }
        console.log('0 - exit');
        console.log('? - help');
    }
}

module.exports = Menu;