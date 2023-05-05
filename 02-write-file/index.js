const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const readline = require('readline');

const writeStream = fs.createWriteStream(path.join(__dirname, 'test.txt'));
const rl = readline.createInterface({ input: stdin, output: stdout });

console.log('Привет! Введите данные для записи:');

function writeLine(line) {
  writeStream.write(line + '\n');
} 

rl.on('line', (line) => {
  if (line.trim() === 'exit') {
    process.exit();
  }
  writeLine(line);
});

process.on('exit', () => {
  console.log('Спасибо, пока!');
});
process.on('SIGINT', () => {
  process.exit();
});