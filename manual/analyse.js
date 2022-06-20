import data from './data.json' assert {type: 'json'};

let min = Infinity;
let max = 0;


for (let i = 0; i < data.length; i++) {
  let words = data[i].name.match(/[a-zA-Z]+/g) || [];

  let totalWords = words.length;
  let totalLetters = words.join('').length;

  let averageWordLength = totalLetters / totalWords;

  if (averageWordLength < min) {
    min = averageWordLength;
  }

  if (averageWordLength > max) {
    max = averageWordLength;
  }
}

console.log('Min', min);
console.log('Max', max);
