// const errorMassage = require("./new.js");

const extractOptions = function (input, fs) {
  inputValues = {};

  let option = input.find((element) => element.startsWith("-"));

  if (!option) inputValues = getOptionsOnlyForFiles(input, fs);
  if (option && option.length > 0)
    inputValues = getAllOptions(input, fs, option);

  return inputValues;
};

const getOptionsOnlyForFiles = function (input, fs) {
  return { fileNameArray: input, count: 10, printOption: "n" };
};

const getAllOptions = function (input, fs, option) {
  if (option.length == 1) return getOptionsForHyphenOnly(input, fs, option);

  if (option.length == 2) return getOptionsForCharOnly(input, fs, option);

  return getOptionsForCharAndNum(input, fs, option);
};

const getOptionsForCharAndNum = function (input, fs, option) {
  let inputValues = {};
  inputValues.count = option.slice(1);
  inputValues.printOption = "n";
  if (isValidOption(option[1])) {
    inputValues.count = option.slice(2);
    inputValues.printOption = option[1];
  }
  inputValues.fileNameArray = input.slice(1);

  return inputValues;
};

const getOptionsForCharOnly = function (input, fs, option) {
  if (isValidOption(option[1])) {
    return {
      printOption: option[1],
      count: input[1],
      fileNameArray: input.slice(2),
    };
  }
  return {
    printOption: "n",
    count: option.slice(1),
    fileNameArray: input.slice(1),
  };
};

const getOptionsForHyphenOnly = function (input, fs, option) {
  let inputValues = {};
  inputValues.count = input[1];
  inputValues.printOption = "n";
  if (input[1].length > 1) {
    if (isValidOption(input[1])) {
      inputValues.count = input[1].slice(1);
      inputValues.printOption = input[1].slice(0, 1);
    }
    inputValues.fileNameArray = input.slice(2);
    // if (fs.existsSync(input[1])) errorMAssage();
  }

  if (input[1].length == 1) {
    if (isValidOption(input[1])) {
      inputValues.count = input[2];
      inputValues.printOption = input[1];
      inputValues.fileNameArray = input.slice(3);
    } else {
      inputValues.count = input[1];
      inputValues.printOption = "n";
      inputValues.fileNameArray = input.slice(2);
    }
    // if (fs.existsSync(input[2])) errorMAssage();
  }
  return inputValues;
};

const isValidOption = (char) => char == "c" || char == "n";
module.exports = extractOptions;
