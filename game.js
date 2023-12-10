const { argv } = require("node:process");
const readline = require("readline-sync"); 
const { exit } = require("node:process");

const Rules = require("./gamerules");
const Table = require("./table");
const Key = require("./randomkey");
const Menu = require("./menu");
const Hmac = require("./hmac");
const { error } = require("node:console");

const initialParameters = argv.slice(2);
let userInput = "";
let intermediaryInput = "";
let computerChoice = "";

function computerChoiceGenerator() {
    computerChoice = initialParameters[Math.floor(Math.random()*initialParameters.length)];
    return computerChoice;
}

const toFindDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) !== index);
const duplicateElements = toFindDuplicates(initialParameters);

try { 
    if (initialParameters.length == 0) {
        console.log("No options for the moves were given, please enter odd number of options greater than 1. (E.g.: Rock Scissor Paper Lizard Spock) ")
        throw error;
    } else if (initialParameters.length < 3 || initialParameters.length % 2 == 0) {
        console.log("Please make sure you added odd number of move types greater than 1");
        console.log(initialParameters);
        throw error;     
    } else if (duplicateElements.length != 0) {
        console.log("Duplicates in moves detected, plese do not use duplicates");
        throw error
    }

    computerChoiceGenerator();

    const randomKey = new Key();
    randomKey.generate();

    const newHmac = new Hmac(randomKey.token, computerChoice);
    newHmac.createEncription();
    console.log("HMAC: ", newHmac.token);

    const newMenu = new Menu(initialParameters);
    newMenu.showMenu();

    intermediaryInput = readline.question("Enter your move: ");

    while(initialParameters[intermediaryInput] == undefined && intermediaryInput != "?") {
        console.clear();
        console.log("Please enter valid move");
        console.log("HMAC: ", newHmac.token);
        newMenu.showMenu();
        intermediaryInput = readline.question("Enter your move again: ");

    }

    if (intermediaryInput == "0") {
        exit();
    }  else if (intermediaryInput == "?") {
        console.clear();
        const newTable = new Table(initialParameters);
        newTable.createRows();
        console.log(newTable.createTable());
        exit();
    }


    userInput = initialParameters[intermediaryInput - 1];
    console.log("Your move: ", userInput);
    
    console.log("Computer move: ", computerChoice);

    const rules = new Rules(initialParameters, userInput, computerChoice)
    rules.modifyArray();
    rules.getResults();
    rules.sayResults();

    console.log("HMAC key: ", randomKey.token);
    console.log();

} catch (e) {
    console.log("");
}