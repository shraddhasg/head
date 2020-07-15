const fs = require("fs");

const printLines = function (fileName, numberOfLines) {
  let file = fs.readFileSync(fileName, "utf-8");
  let linesInArray = file.split("\n");
  console.log("*****", fileName, "*****");
  for (let i = 0; i < numberOfLines; i++) console.log(linesInArray[i]);
};

const printBytes = function (fileName, numberOfLines) {
  let file = fs.readFileSync(fileName, "utf-8");
  let bytesInArray = file.split("");
  let string = "";
  console.log("*****", fileName, "*****");
  for (let i = 0; i < numberOfLines; i++) string += bytesInArray[i];
  console.log(string);
};

const linesNeeded = function (arg) {
  if (arg[0] != "-") console.log("You passed wrong input!!!");
  else {
    let requireLines = arg.slice(1);
    if (arg[1] == "n" || arg1[1] == "c") requireLines = arg.slice(2);
    return requireLines;
  }
};

let arg1 = process.argv[2];
let arg2 = process.argv[3];
let arg3 = process.argv[4];


if (arg1.includes(".")) printLines(arg1, 10);
else {
  let requireLines = linesNeeded(arg1);
  console.log(requireLines,"----------------");
  arg1.includes("c")
    ? printBytes(arg2, requireLines)
    : printLines(arg2, requireLines);
}

if (arg2) {
  if (arg2.includes(".")) {
    if (arg1.includes(".")) printLines(arg2, 10);
  } else {
    let requireLines = linesNeeded(arg1);
    arg1.includes("c")
      ? printBytes(arg2, requireLines)
      : printLines(arg2, requireLines);
  }
}

if (arg3) {
  if (arg3.includes(".") && arg2.includes(".")) {
    let requireLines = linesNeeded(arg1);
    arg1.includes("c")
      ? printBytes(arg2, requireLines)
      : printLines(arg2, requireLines);
  } else console.log("Argument 2 and 3 must be file name!!!");
}

