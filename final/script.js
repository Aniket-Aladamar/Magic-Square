const tutorialSlides = document.getElementById('tutorialSlides');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const startGameButton = document.getElementById('startGameButton');
const tutorialSection = document.getElementById('tutorial');
const gameSection = document.getElementById('game');

let currentSlide = 0;
const totalSlides = tutorialSlides.children.length;

prevButton.addEventListener('click', function () {
  currentSlide--;
  showSlide(currentSlide);
  updateButtonVisibility();
});

nextButton.addEventListener('click', function () {
  currentSlide++;
  showSlide(currentSlide);
  updateButtonVisibility();
});

startGameButton.addEventListener('click', function () {
  tutorialSection.classList.remove('show');
  gameSection.classList.add('show');
  tutorialSection.style.display = 'none';
  gameSection.style.display = 'block';
  request('http://localhost:3000/magicsquare'); // Call the request function here
});

window.addEventListener('load', function () {
  showSlide(currentSlide);
  updateButtonVisibility();
});

function showSlide(slideIndex) {
  for (let i = 0; i < totalSlides; i++) {
    const slide = tutorialSlides.children[i];
    slide.style.display = i === slideIndex ? 'block' : 'none';
    slide.classList.add('fade-in');
  }
}

function updateButtonVisibility() {
  prevButton.style.display = currentSlide > 0 ? 'inline-block' : 'none';
  nextButton.style.display = currentSlide < totalSlides - 1 ? 'inline-block' : 'none';
}

let file = 'http://localhost:3000/magicsquare';
let countdownInterval;
let remainingTime;
let jsonData;

async function request(file) {
  try {
    let jsonResult = await fetch(file);
    let jsonData = await jsonResult.json();
    console.log(jsonData);
    const playerProfile = jsonData.playerProfile;
    document.getElementById('username').textContent = `Username: ${playerProfile.username}`;
    document.getElementById('attempts').textContent = `Number of Attempts: ${playerProfile.attempts}`;
    createMagicSquareGame(jsonData.levels[playerProfile.currentLevel], playerProfile, jsonData);
    startTimer(jsonData.levels[playerProfile.currentLevel].timeLimit, playerProfile, jsonData);
    // return jsonData;
  } catch (error) {
    console.log('Error:', error);
  }
}

function startTimer(timeLimit, playerProfile, jsonData) {
  remainingTime = timeLimit;
  const timerElement = document.getElementById('timer');
  timerElement.textContent = `Time Remaining: ${remainingTime}s`;
  countdownInterval = setInterval(updateTimer, 1000, playerProfile, jsonData);
}

function updateTimer(playerProfile, jsonData) {
  remainingTime--;
  const timerElement = document.getElementById('timer');
  timerElement.textContent = `Time Remaining: ${remainingTime}s`;

  if (remainingTime <= 0) {
    clearInterval(countdownInterval);
    handleTimeout(playerProfile, jsonData);
  }
}

function handleTimeout(playerProfile, jsonData) {
  alert('Time is up! You could not complete the level. Please retry.');
  playerProfile.attempts++;
  document.getElementById('attempts').textContent = `Number of Attempts: ${playerProfile.attempts}`;
  updatePlayerProfile(playerProfile);
  restartLevel(playerProfile, jsonData);
}

function restartLevel(playerProfile, jsonData) {
  const currentLevel = playerProfile.currentLevel;
  createMagicSquareGame(jsonData.levels[currentLevel], playerProfile, jsonData);
  startTimer(jsonData.levels[currentLevel].timeLimit, playerProfile, jsonData);
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

const getRandomMissingNumbers = (size, level) => {
  const totalNumbers = size * size;
  const missingNumbersCount = Math.floor(totalNumbers / 2);
  const missingNumbers = new Set();

  if (level == 1) {
    missingNumbers.add(2);
    missingNumbers.add(3);
    missingNumbers.add(4);
    missingNumbers.add(8);
  } else if (level == 2) {
    missingNumbers.add(3);
    missingNumbers.add(5);
    missingNumbers.add(6);
    missingNumbers.add(9);
  } else {
    missingNumbers.add(1);
    missingNumbers.add(3);
    missingNumbers.add(5);
    missingNumbers.add(4);
  }

  console.log(missingNumbers);
  return missingNumbers;
};

const createMagicSquareGame = (levelData, playerProfile, jsonData) => {
  const gridSize = levelData.size;
  const magicSquare = generateMagicSquare(gridSize, levelData.sum);
  const missingNumbers = getRandomMissingNumbers(gridSize, playerProfile.currentLevel);
  var count = 0;
  const scoreValueElement = document.getElementById('scoreValue');
  scoreValueElement.textContent = playerProfile.score;

  const magicSquareGame = document.getElementById('magicSquareGame');
  magicSquareGame.innerHTML = '';

  for (var i = 0; i < gridSize; i++) {
    for (var j = 0; j < gridSize; j++) {
      const input = document.createElement('input');
      input.type = 'number';
      input.classList.add('input-cell');
      input.dataset.row = i;
      input.dataset.col = j;
      input.value = missingNumbers.has(magicSquare[i][j]) ? '' : magicSquare[i][j];
      input.addEventListener('input', handleInput);
      magicSquareGame.appendChild(input);
    }
  }

  function handleInput(event) {
    const target = event.target;
    const row = parseInt(target.dataset.row);
    const col = parseInt(target.dataset.col);
    const inputValue = target.value;

    if (inputValue !== '') {
      const selectedNumber = parseInt(inputValue);

      if (isNaN(selectedNumber) || selectedNumber < 1 || selectedNumber > gridSize * gridSize) {
        target.classList.add('incorrect');
      } else {
        target.classList.remove('incorrect');
        if (selectedNumber === magicSquare[row][col]) {
          count++;
          target.setAttribute('disabled', 'disabled');
          target.classList.remove('incorrect');
          target.classList.add('correct');

          if (count === gridSize * gridSize - missingNumbers.size) {
            alert('Congratulations! You have successfully completed the level.');
            playerProfile.score++;
            scoreValueElement.textContent = playerProfile.score;
            updatePlayerProfile(playerProfile);
            nextLevel(playerProfile, jsonData);
          }
        } else {
          target.classList.add('incorrect');
        }
      }
    } else {
      target.classList.remove('incorrect');
    }
  }
};

const nextLevel = (playerProfile, jsonData) => {
  playerProfile.currentLevel++;
  playerProfile.attempts++;
  document.getElementById('attempts').textContent = `Number of Attempts: ${playerProfile.attempts}`;

  if (playerProfile.currentLevel < jsonData.levels.length) {
    createMagicSquareGame(jsonData.levels[playerProfile.currentLevel], playerProfile, jsonData);
    startTimer(jsonData.levels[playerProfile.currentLevel].timeLimit, playerProfile, jsonData);
  } else {
    alert('Congratulations! You have completed all levels. Game Over!');
    resetGame();
  }

  updatePlayerProfile(playerProfile);
};

function updatePlayerProfile(playerProfile) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(playerProfile)
  };

  fetch('http://localhost:3000/playerprofile/1', requestOptions)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log('Error:', error));
}

function resetGame() {
  clearInterval(countdownInterval);
  document.getElementById('username').textContent = '';
  document.getElementById('attempts').textContent = '';
  document.getElementById('timer').textContent = '';
  document.getElementById('scoreValue').textContent = '';
  document.getElementById('magicSquareGame').innerHTML = '';
  document.getElementById('nextLevelButton').disabled = true;
  tutorialSection.style.display = 'block';
  gameSection.style.display = 'none';
  currentSlide = 0;
  showSlide(currentSlide);
  updateButtonVisibility();
}

