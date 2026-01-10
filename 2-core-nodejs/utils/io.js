const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const io = (output) => {
  return new Promise((resolve) => {
    rl.question(output, (input) => resolve(input));
  });
};

module.exports = { rl, io };
