var { AsciiTable3, AlignmentEnum } = require('ascii-table3');

class Table {
    constructor(moves){
        this.moves = moves;
        this.copyOfMoves = this.moves.slice();

        this.halfPoint = Math.floor(this.moves.length/2);

        this.rows = [];
        this.results = ['Win', 'Lose', 'Draw'];
    }

    createRows() {
        for (let i = 0; i < this.moves.length; i++) {
            this.rows.push([]);
            this.rows[i].push(this.moves[i]);

            const modifiedArray = this.moves.slice();

            if((this.halfPoint - i) > 0) {
                const difference = this.halfPoint - i;
                for (let i = 0; i < difference; i++) {
                    modifiedArray.splice(0, 0, modifiedArray[this.moves.length-1]);
                    modifiedArray.pop();
                }
            } else if ((this.halfPoint - i) < 0) {
                const difference = i - this.halfPoint;
                for (let i = 0; i < difference; i++) {
                    modifiedArray.push(modifiedArray[0]);
                    modifiedArray.shift();
                }
            }
            let firstVar = this.moves[i];
            for (let j = 0; j < this.moves.length; j++) {

                let secondVar = this.moves[j];
                if (modifiedArray.indexOf(firstVar) == modifiedArray.indexOf(secondVar)) { 
                    this.rows[i].push(this.results[2]);
                }
                else if (modifiedArray.indexOf(firstVar) > modifiedArray.indexOf(secondVar)) { 
                    this.rows[i].push(this.results[1]);
                } else {
                    this.rows[i].push(this.results[0]);
                }
            }
        }
    }

    createTable() {
        let table = 
            new AsciiTable3()
            .setHeading('Computer vs User =>', ...this.moves)
            .setAlign(4, AlignmentEnum.CENTER)
            .addRowMatrix(this.rows);
        return table.toString();
    }
}

module.exports = Table;