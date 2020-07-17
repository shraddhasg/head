const main = require("./head.js");
// let requirementsFromUser = require("head. js");
const input = process.argv.slice(2);
const fs = require("fs");

// let option = input.find((element) => element.startsWith("-"));

main(input, fs);
