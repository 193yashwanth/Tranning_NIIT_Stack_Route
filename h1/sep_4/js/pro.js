const readline = require('readline');

const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});

function findLargestString(...strings) {
if (strings.length === 0) {
return "No strings provided.";
}

let largest = strings[0];

for (let i = 1; i < strings.length; i++) {
if (strings[i].length > largest.length) {
largest = strings[i];
}
}

return largest;
}

rl.question("Enter strings separated by spaces: ", (userInput) => {
const inputStrings = userInput.split(" ");
const largest = findLargestString(...inputStrings);

if (largest) {
console.log(`The largest string is: ${largest}`);
} else {
console.log("No valid strings provided.");
}

rl.close();
});