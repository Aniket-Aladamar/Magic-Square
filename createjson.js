const fs = require('fs');

const data = {
  level1: 3,
  level2: 3,
  level3: 4
};

const jsonString = JSON.stringify(data, null, 2);

fs.writeFile('data.json', jsonString, 'utf8', (err) => {
  if (err) {
    console.log('Error:', err);
  } else {
    console.log('JSON file has been created.');
  }
});
