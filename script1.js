let file = './magicsquare.json';
let countdownInterval;
let remainingTime;
let jsonData;

async function request(file) {
  try {
    let jsonResult = await fetch(file);
    let jsonData = await jsonResult.json();
    console.log(jsonData);
    const playerProfile = jsonData.playerProfile;
    document.getElementById('username').textContent = `Hello ${playerProfile.username}`;
    document.getElementById('attempts').textContent = `Number of Attempts: ${playerProfile.attempts}`;
    document.getElementById('currentlevel').textContent = `Level: ${playerProfile.currentLevel}`;
    createMagicSquareGame(jsonData.levels[playerProfile.currentLevel], playerProfile,jsonData);
    startTimer(jsonData.levels[playerProfile.currentLevel].timeLimit, playerProfile,jsonData);
    // return jsonData;
  } catch (error) {
    console.log('Error:', error);
  }
}

function startTimer(timeLimit, playerProfile,jsonData) {
  remainingTime = timeLimit;
  const timerElement = document.getElementById('timer');
  timerElement.textContent = `Time Remaining: ${remainingTime}s`;
  countdownInterval = setInterval(updateTimer, 1000, playerProfile,jsonData);
}

function updateTimer(playerProfile,jsonData) {
  remainingTime--;
  const timerElement = document.getElementById('timer');
  timerElement.textContent = `Time Remaining: ${remainingTime}s`;

  if (remainingTime <= 0) {
    clearInterval(countdownInterval);
    handleTimeout(playerProfile,jsonData);
  }
}

function handleTimeout(playerProfile,jsonData) {
  alert('Time is up! You could not complete the level. Please retry.');
  playerProfile.attempts++;
  document.getElementById('attempts').textContent = `Number of Attempts: ${playerProfile.attempts}`;
  updatePlayerProfile(playerProfile);
  restartLevel(playerProfile,jsonData);
}

function restartLevel(playerProfile,jsonData) {
  const currentLevel = playerProfile.currentLevel;
  createMagicSquareGame(jsonData.levels[currentLevel], playerProfile,jsonData);
  startTimer(jsonData.levels[currentLevel].timeLimit, playerProfile,jsonData);
}

// var data = request(file);

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
    console.log(magicSquare);
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
    console.log(magicSquare);
    return magicSquare;
  }
}

const getRandomMissingNumbers = (size,level) => {
  const totalNumbers = size * size;
  const missingNumbersCount = Math.floor(totalNumbers / 2);
  const missingNumbers = new Set();

  // while (missingNumbers.size < missingNumbersCount && missingNumbers.size < 3) {
  //   const randomNumber = Math.floor(Math.random() * totalNumbers) + 1;

  //   if (!missingNumbers.has(randomNumber)) {
  //     missingNumbers.add(randomNumber);
  //   }
  // }

  // if (missingNumbers.size === 0) {
  //   const randomNumber = Math.floor(Math.random() * totalNumbers) + 1;
  //   missingNumbers.add(randomNumber);
  // }

  // const randomIndex = Math.floor(Math.random() * size);

  // for (let i = 0; i < size; i++) {
  //   if (i !== randomIndex) {
  //     missingNumbers.add(i * size + randomIndex + 1);
  //   }
  // }

  if(level==1){
    
  missingNumbers.add(2);
  missingNumbers.add(3);
  missingNumbers.add(4);
  missingNumbers.add(8);
  }
  else if(level==2){
    missingNumbers.add(3);
    missingNumbers.add(5);
    missingNumbers.add(6);
    missingNumbers.add(9);
  }
  else{
    
  missingNumbers.add(1);
  missingNumbers.add(3);
  missingNumbers.add(5);
  missingNumbers.add(4);
  }

  console.log(missingNumbers);
  return missingNumbers;
};
const createMagicSquareGame = (levelData, playerProfile,jsonData) => {
  const gridSize = levelData.size;
  const magicSquare = generateMagicSquare(gridSize, levelData.sum);
  const missingNumbers = getRandomMissingNumbers(gridSize,playerProfile.currentLevel);
  var count = 0;
  const scoreValueElement = document.getElementById('scoreValue');
  scoreValueElement.textContent = playerProfile.score;

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
        cellInput.placeholder = ' ';
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
  checkButton.classList.add('check-button');
  checkButton.addEventListener('click', function () {
    checkMagicSquare(magicSquare, playerProfile);
  });
  magicSquareGameDiv.appendChild(checkButton);
  

  const nextLevelButton = document.getElementById('nextLevelButton');
  nextLevelButton.addEventListener('click', function () {
    const nextLevel = parseInt(playerProfile.currentLevel) + 1;
    document.getElementById('currentlevel').textContent = `Level: ${nextLevel}`;

    if (jsonData.levels[nextLevel]) {
      playerProfile.currentLevel = nextLevel;
      updatePlayerProfile(playerProfile);
      createMagicSquareGame(jsonData.levels[nextLevel], playerProfile, jsonData);
      nextLevelButton.disabled = true;
      clearInterval(countdownInterval);
      startTimer(jsonData.levels[nextLevel].timeLimit, playerProfile, jsonData);
    } else {
      alert('Congratulations! You have completed all levels!');
    }
  });
  
};

function checkMagicSquare(magicSquare, playerProfile) {
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
    playerProfile.score += 100;
    clearInterval(countdownInterval);
   // playerProfile.attempts--;
    updatePlayerProfile(playerProfile);
    var scoreValueElement = document.getElementById('scoreValue');
    scoreValueElement.textContent = playerProfile.score;
    var nextLevelButton = document.getElementById('nextLevelButton');
     nextLevelButton.disabled = false;
    
  } else {
    alert('Oops! Some numbers are incorrect. Please try again.');
  }
}

async function updatePlayerProfile(playerProfile) {
  try {
    let jsonResult = await fetch(file);
    let jsonData = await jsonResult.json();
    jsonData.playerProfile = playerProfile;

    let response = await fetch(file, {
      method: 'PUT',
      body: JSON.stringify(jsonData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response);
    if (response.ok) {
      console.log('Player profile updated successfully.');
    } else {
      console.log('Failed to update player profile.');
    }
  } catch (error) {
    console.log('Error:', error);
  }
}
