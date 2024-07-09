let file = 'http://127.0.0.1:5500/data.json';

async function request(file) {
  try {
    let jsonResult = await fetch(file);
    let jsonData = await jsonResult.json();
    console.log(jsonData);
    createMagicSquareGame(jsonData.level1,jsonData);
    return jsonData;
  } catch (error) {
    console.log('Error:', error);
  }
}

var data = request(file);

function generateRandomSum() {
  return Math.floor(Math.random() * 21); 
}

function generateMagicSquare(size, sum) {
  if (size % 2 === 0) {
    // Generate magic square for even size
    var arr = Array(size).fill(0).map(x => Array(size).fill(0));

    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        arr[i][j] = (size * i) + j + 1;
      }
    }

    var order = parseInt(size / 4);

    for (var i = 0; i < order; i++) {
      for (var j = 0; j < order; j++) {
        arr[i][j] = (size * size + 1) - arr[i][j];
      }
    }

    for (var i = 0; i < order; i++) {
      for (var j = 3 * order; j < size; j++) {
        arr[i][j] = (size * size + 1) - arr[i][j];
      }
    }

    for (var i = 3 * order; i < size; i++) {
      for (var j = 0; j < order; j++) {
        arr[i][j] = (size * size + 1) - arr[i][j];
      }
    }

    for (var i = 3 * order; i < size; i++) {
      for (var j = 3 * order; j < size; j++) {
        arr[i][j] = (size * size + 1) - arr[i][j];
      }
    }

    for (var i = order; i < 3 * order; i++) {
      for (var j = order; j < 3 * order; j++) {
        arr[i][j] = (size * size + 1) - arr[i][j];
      }
    }

    // Adjust the sum
    var expectedSum = Math.floor(sum / size); // Use Math.floor to get an integer result
    var adjustment = expectedSum - Math.floor((size * size + 1) / 2); // Use Math.floor for adjustment

    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        arr[i][j] += adjustment;
      }
    }

    return arr;
  } else {
    // Generate magic square for odd size
    var magicSquare = Array(size).fill(0).map(x => Array(size).fill(0));
    var i = parseInt(size / 2);
    var j = size - 1;

    for (var num = 1; num <= size * size;) {
      if (i === -1 && j === size) {
        j = size - 2;
        i = 0;
      } else {
        if (j === size) {
          j = 0;
        }
        if (i < 0) {
          i = size - 1;
        }
      }

      if (magicSquare[i][j] !== 0) {
        j -= 2;
        i++;
        continue;
      } else {
        magicSquare[i][j] = num++;
      }

      j++;
      i--;
    }

    // Adjust the sum
    var expectedSum = Math.floor(sum / size); // Use Math.floor to get an integer result
    var adjustment = expectedSum - Math.floor((size * size + 1) / 2); // Use Math.floor for adjustment

    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        magicSquare[i][j] += adjustment;
      }
    }

    return magicSquare;
  }
}
const getRandomMissingNumbers = (size) => {
  const totalNumbers = size * size;
  const missingNumbersCount = Math.floor(totalNumbers / 2);
  const missingNumbers = new Set();

  while (missingNumbers.size < missingNumbersCount && missingNumbers.size < 3) {
    const randomNumber = Math.floor(Math.random() * totalNumbers) + 1;

    if (!missingNumbers.has(randomNumber)) {
      missingNumbers.add(randomNumber);
    }
  }

  if (missingNumbers.size === 0) {
    const randomNumber = Math.floor(Math.random() * totalNumbers) + 1;
    missingNumbers.add(randomNumber);
  }

  const randomIndex = Math.floor(Math.random() * size);

  for (let i = 0; i < size; i++) {
    if (i !== randomIndex) {
      missingNumbers.add(i * size + randomIndex + 1);
    }
  }

  console.log(missingNumbers);
  return missingNumbers;
};

const createMagicSquareGame = (gridSize,jsonData) => {
  const magicSquare = generateMagicSquare(gridSize, generateRandomSum());
  const missingNumbers = getRandomMissingNumbers(gridSize);
  var count = 0;
  var score = 0;
  const scoreValueElement = document.getElementById('scoreValue');
  scoreValueElement.textContent = score;

  const magicSquareGameDiv = document.getElementById('magicSquareGame');
  magicSquareGameDiv.innerHTML = '';

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      count++;
      const cellValue = magicSquare[row][col];
      const cellInput = document.createElement('input');
      cellInput.type = 'number';
      cellInput.maxLength = 1;

      if (missingNumbers.has(count)) {
        cellInput.placeholder = 'Enter the number';
        cellInput.setAttribute('data-row', row);
        cellInput.setAttribute('data-col', col);
      } else {
        cellInput.value = cellValue;
        cellInput.disabled = true;
      }

      magicSquareGameDiv.appendChild(cellInput);
    }
    magicSquareGameDiv.appendChild(document.createElement('br'));
  }

  const checkButton = document.createElement('button');
  checkButton.textContent = 'Check';
  checkButton.addEventListener('click', function(){
    checkMagicSquare(magicSquare);
  });
  magicSquareGameDiv.appendChild(checkButton);

  const nextLevelButton = document.getElementById('nextLevelButton');
  nextLevelButton.addEventListener('click', function() {
    const nextLevel = jsonData.level2;
    if (nextLevel) {
      createMagicSquareGame(nextLevel);
      nextLevelButton.disabled = true;
    } else {
      alert('Congratulations! You have completed all levels!');
    }
  });
};

function checkMagicSquare(magicSquare) {
  const inputs = document.querySelectorAll('#magicSquareGame input[data-row][data-col]');
  let isCorrect = true;

  for (const input of inputs) {
    const row = parseInt(input.getAttribute('data-row'));
    const col = parseInt(input.getAttribute('data-col'));
    const userValue = parseInt(input.value);
    const correctValue = magicSquare[row][col];

    if (userValue !== correctValue || isNaN(userValue)) {
      isCorrect = false;
      input.classList.add('incorrect');
    } else {
      input.classList.remove('incorrect');
    }
  }

  if (isCorrect) {
    alert('Congratulations! Your magic square is correct!');
    var scoreValueElement = document.getElementById('scoreValue');
    var score = parseInt(scoreValueElement.textContent);
    score += 100;
    scoreValueElement.textContent = score;

    var nextLevelButton = document.getElementById('nextLevelButton');
    nextLevelButton.disabled = false;
  } else {
    alert('Oops! Some numbers are incorrect. Please try again.');
  }
}
