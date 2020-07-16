const requirement = require("./head.js");
// let requirementsFromUser = require("head. js");
const input = process.argv.slice(2);

let option = input.find((element) => element.startsWith("-"));

requirement(input, option);
