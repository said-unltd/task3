class Rules {
    constructor(moves, playerChoice, computerChoice){
        this.moves = moves;
        this.playerChoice = playerChoice;
        this.computerChoice = computerChoice;
        this.modifiedArray = this.moves.slice();
        this.possibleResults = ['Win', 'Lose', 'Draw'];
        this.result = '';
        this.textMessage = ['Congratulations, You won!', 'Computer wins', 'Well, it is a Draw']
    }

    modifyArray() {
        const halfPoint = (Math.floor((this.modifiedArray.length)/2));
        const maximum = Math.max(this.moves.indexOf(this.playerChoice), this.moves.indexOf(this.computerChoice));
        const sum = maximum + 1 + halfPoint;

        if (sum > this.moves.length){
            const extraAmount = sum - this.moves.length;
            for (let i = 0; i < extraAmount; i++) {
                this.modifiedArray.push(this.moves[i]);
                this.modifiedArray.shift();
            }
        }
    }

    getModifiedArray() {
        return this.modifiedArray.slice();
    }

    getResults() {
        if (this.modifiedArray.indexOf(this.playerChoice) > this.modifiedArray.indexOf(this.computerChoice)) {
            this.result = this.possibleResults[0];
        } else if (this.modifiedArray.indexOf(this.playerChoice) < this.modifiedArray.indexOf(this.computerChoice)) {
            this.result = this.possibleResults[1];
        } else {
            this.result = this.possibleResults[2];
        }
    }

    sayResults() {
        if (this.result == this.possibleResults[0]) {
            console.log(this.textMessage[0]);
        } else if (this.result == this.possibleResults[1]) {
            console.log(this.textMessage[1]);
        } else {
            console.log(this.textMessage[2]);
        }
    }
}

module.exports = Rules;