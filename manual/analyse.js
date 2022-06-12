import data from './data.json' assert {type: 'json'};

let min = Infinity;
let max = 0;

for (let i = 0; i < data.length; i++) {
  const length = (data[i].name.match(/['!"#\$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`\{\|\}\~']/g) || []).length;

  if (length < min) {
    min = length;
  }
  if (length > max) {
    max = length;
  }
}

console.log('Min', min);
console.log('Max', max);
