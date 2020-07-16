// const head = require("./src/libs");

const fs = require("fs");

// let optionsForPrinting = {};
let fileNameArray = [];
let numberOfLines, printOption;

const input = process.argv.slice(2);

let option = input.find((element) => element.startsWith("-"));

const singleInput = function (input) {
  if (fs.existsSync(input[0])) {
    printOption = "n";
    numberOfLines = 10;
    fileNameArray.push(input[0]);
    for (let i = 1; i < input.length; i++) fileNameArray.push(input[0]);
  } else console.log("Error!!! file not exist");
};

const findOptions = function (input, option) {
  if (option && option.length == 2) optionLength2(option);

  if (option && option.length > 2) optionLengthLessThan2(option);

  if (option && option.length == 1) optionLength1(option);
};

const optionLength1 = function (option) {
  numberOfLines = input[1];
  printOption = "n";
  if (input[1].length > 1) {
    if (input[1].startsWith("n") || input[1].startsWith("c")) {
      numberOfLines = input[1].slice(1);
      printOption = input[1].slice(0, 1);
    }
    if (fs.existsSync(input[1])) printError();
  }

  if (input[1].length == 1) {
    if (input[1].startsWith("c") || input[1].startsWith("n")) {
      numberOfLines = input[2];
      printOption = input[1];
    }
    if (fs.existsSync(input[2])) printError();
  }
};

const optionLengthLessThan2 = function (option) {
  numberOfLines = option.slice(1);
  printOption = "n";
  if (option[1] == "n" || option[1] == "c") {
    numberOfLines = option.slice(2);
    printOption = option[1];
  }
};

const optionLength2 = function (option) {
  if (option[1].startsWith("c") || option[1].startsWith("n")) {
    printOption = option[1];
    numberOfLines = input[1];
  } else {
    printOption = "n";
    numberOfLines = option.slice(1);
  }
};

const findFiles = function (input, option) {
  for (let i = input.length - 1; i >= 0; i--) {
    if (fs.existsSync(input[i])) fileNameArray.unshift(input[i]);
    numberOfLines = 10;
    printOption = "n";
  }
  if (option && option.length > 0) findOptions(input, option);
};

const openFile = function (fileName) {
  if (!fs.existsSync(fileName)) printError();
  return fs.readFileSync(fileName, "utf-8");
};

const printLines = function (openedFile, numberOfLines) {
  let line = openedFile.split("\n");
  for (let i = 0; i < numberOfLines; i++) {
    console.log(line[i]);
  }
  console.log("============================================================");
};

const printBytes = function (openedFile, numberOfLines) {
  let content = openedFile.slice(0, numberOfLines);
  console.log(content);
  console.log("============================================================");
};

const printData = function (fileNameArray, numberOfLines, printOption) {
  for (let i = 0; i < fileNameArray.length; i++) {
    let openedFile = openFile(fileNameArray[i]);
    printOption == "n"
      ? printLines(openedFile, numberOfLines)
      : printBytes(openedFile, numberOfLines);
  }
};

const requirement = function (input, option) {
  if (input.length == 1) singleInput(input);
  //   console.log(option);
  else findFiles(input, option);

  printData(fileNameArray, numberOfLines, printOption);
};

const printError = function () {
  console.log("There is a error in input!!!");
};

module.exports = requirement;
// module.exports = printData;

//FUNCTION SHOULD DO ONLY ONE THING
//NAME SHOULD BE CLEAR ENOUGH TO TELL WHAT FUNCTION IS DOING
//options : -n 2 file | -n2 file  | -c2 file | -c 2 file
//parser :
//requirement : option:n/c , count:number , file:filename
