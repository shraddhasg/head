// const errorMassage = require("./new.js");

const extractValues = function (input, fs) {
  inputValues = {};

  let option = input.find((element) => element.startsWith("-"));

  if (!option) inputValues = inputHasOnlyFiles(input, fs);
  if (option && option.length > 0) inputValues = allOptions(input, fs, option);

  return inputValues;
};

const inputHasOnlyFiles = function (input, fs) {
  let inputValues = {};
  let fileNameArray = [];
  for (let i = input.length - 1; i >= 0; i--) {
    if (fs.existsSync(input[i])) fileNameArray.unshift(input[i]);
  }
  let count = 10;
  let printOption = "n";

  inputValues.fileNameArray = fileNameArray;
  inputValues.count = count;
  inputValues.printOption = printOption;

  return inputValues;
};

const allOptions = function (input, fs, option) {
  if (option && option.length == 2)
    inputValues = hyphenWithCharacter(input, fs, option);

  if (option && option.length > 2)
    inputValues = hyphenWithCharAndNum(input, fs, option);

  if (option && option.length == 1) inputValues = onlyHyphen(input, fs, option);

  return inputValues;
};

const hyphenWithCharAndNum = function (input, fs, option) {
  let inputValues = {};
  inputValues.count = option.slice(1);
  inputValues.printOption = "n";
  if (option[1] == "n" || option[1] == "c") {
    inputValues.count = option.slice(2);
    inputValues.printOption = option[1];
  }
  inputValues.fileNameArray = input.slice(1);

  return inputValues;
};

const hyphenWithCharacter = function (input, fs, option) {
  let inputValues = {};
  if (option[1].startsWith("c") || option[1].startsWith("n")) {
    inputValues.printOption = option[1];
    inputValues.count = input[1];
    inputValues.fileNameArray = input.slice(2);
  } else {
    inputValues.printOption = "n";
    inputValues.count = option.slice(1);
    inputValues.fileNameArray = input.slice(1);
  }

  return inputValues;
};

const onlyHyphen = function (input, fs, option) {
  let inputValues = {};
  inputValues.count = input[1];
  inputValues.printOption = "n";
  if (input[1].length > 1) {
    if (input[1].startsWith("n") || input[1].startsWith("c")) {
      inputValues.count = input[1].slice(1);
      inputValues.printOption = input[1].slice(0, 1);
    }
    inputValues.fileNameArray = input.slice(2);
    // if (fs.existsSync(input[1])) errorMAssage();
  }

  if (input[1].length == 1) {
    if (input[1].startsWith("c") || input[1].startsWith("n")) {
      inputValues.count = input[2];
      inputValues.printOption = input[1];
      inputValues.fileNameArray = input.slice(3);
    }
    else{
        inputValues.count = input[1];
      inputValues.printOption = "n";
      inputValues.fileNameArray = input.slice(2);
    }
    // if (fs.existsSync(input[2])) errorMAssage();
  }
  return inputValues;
};

module.exports = extractValues;
