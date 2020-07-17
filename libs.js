// const { count } = require("console");
const extractValues = require("./extraction.js");

const head = function (input, fs) {
  if (!input.length) {
    errorMessage();
    return;
  }
  let parsedData = extractValues(input, fs);
  printData(parsedData, fs);
};

const printData = function ({fileNameArray, count, printOption}, fs) {
  for (let i = 0; i < fileNameArray.length; i++) {
    let fileContents = readFile(fileNameArray[i], fs);
    console.log(generateHeader(fileNameArray[i]));

    printOption == "n"
      ? printLines(fileContents, count)
      : printBytes(fileContents, count);
  }
};

const readFile = function (fileName, fs) {
  if (!fs.existsSync(fileName)) printError();
  return fs.readFileSync(fileName, "utf-8");
};

const generateHeader = function (file) {
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

const errorMessage = function () {
  console.log("There is a error in input!!!");
};

module.exports = head;
// module.exports = errorMAssage;
