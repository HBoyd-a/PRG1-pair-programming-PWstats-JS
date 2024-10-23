const fs = require("fs");

const inputFile = "10000-common-passwords.csv";
const outputFile = "statistics.csv";
const delimiter = ",";

function deleteExistingOutputFile() {
  if (fs.existsSync(outputFile)) {
    fs.unlinkSync(outputFile);
  }
}

function processData() {
  const data = fs.readFileSync(inputFile, "utf-8");
  const lines = data.split(/\n/);

  const passwordLengths = {};

  for (let line of lines) {
    elements = line.split(delimiter);
    let length = elements[1].length;
    if (length in passwordLengths) {
      passwordLengths[length] += 1;
    } else {
      passwordLengths[length] = 1;
    }
  }
  return passwordLengths;

}

function savePasswordLengths(frequencies) {
  for (const length in frequencies) {
    //console.log(length, frequencies[length]); // prints the length eg 6 characters , and the frequency
    let data = (`Chars: ${length} , Count: ${frequencies[length]}`)
    fs.appendFileSync('results.csv', data + '\n', 'utf-8')
  }
}

function saveAlpha(frequencies) {
  const data = fs.readFileSync(inputFile, "utf-8");
  const lines = data.split(/\n/);

  const alphabet = {};

  const regex = /^\d+$/;
  for (let line of lines) {
    elements = line.split(delimiter);
    let char = elements[1][0]
    if (!regex.test(char)) {
      if (char in alphabet) {
        alphabet[char] += 1
      } else {
        alphabet[char] = 1
      }
    }
  }
  console.log(alphabet)
}

// Main execution
deleteExistingOutputFile();
//const results = processData();
//savePasswordLengths(results);
saveAlpha();
