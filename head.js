// const { count } = require("console");
const extractValues = require("./extraction.js");

const main = function (input, fs) {
  let inputInObject;
  if (!input.length) errorMAssage();
  else {
    inputInObject = extractValues(input, fs);
  }
  let fileNameArray, count, printOption;
  fileNameArray = inputInObject.fileNameArray;
  count = inputInObject.count;
  printOption = inputInObject.printOption;

  printData(fileNameArray, count, printOption, fs);
};

const printData = function (fileNameArray, count, printOption, fs) {
  for (let i = 0; i < fileNameArray.length; i++) {
    let fileContents = openFile(fileNameArray[i], fs);
    console.log(headerOfFile(fileNameArray[i]));

    printOption == "n"
      ? printLines(fileContents, count)
      : printBytes(fileContents, count);
  }
};

const openFile = function (fileName, fs) {
  if (!fs.existsSync(fileName)) printError();
  return fs.readFileSync(fileName, "utf-8");
};

const headerOfFile = function (file) {
  return "====>" + file + "<====";
};

const printLines = function (fileContents, count) {
  let line = fileContents.split("\n");
  for (let i = 0; i < count && i < line.length; i++) {
    console.log(line[i]);
  }
  console.log("\n");
};

const printBytes = function (fileContents, count) {
  let content = fileContents.slice(0, count);
  console.log(content);
  console.log("\n");
};

const errorMAssage = function () {
  console.log("There is a error in input!!!");
};

module.exports = main;
// module.exports = errorMAssage;
