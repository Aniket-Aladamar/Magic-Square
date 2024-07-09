const gridSize = 3; // Adjust the grid size as needed
let magicSquare;


const generateMagicSquare = (size) => {
  const square = new Array(size).fill(0).map(() => new Array(size).fill(null));

  let row = Math.floor(size / 2);
  let col = size - 1;

  for (let num = 1; num <= size * size; num++) {
    square[row][col] = num;

    row--;
    col++;

    if (row < 0 && col === size) {
      row = 0;
      col = size - 2;
    } else if (row < 0) {
      row = size - 1;
    } else if (col === size) {
      col = 0;
    } else if (square[row][col] !== null) {
      row++;
      col -= 2;
    }
  }

  return square;
};

const getRandomMissingNumbers = (size) => {
  const totalNumbers = size * size;
  const missingNumbersCount = Math.floor(totalNumbers / 2);
  const missingNumbers = new Set();

  while (missingNumbers.size < missingNumbersCount) {
    const randomNumber = Math.floor(Math.random() * totalNumbers) + 1;
    missingNumbers.add(randomNumber);
  }

  return missingNumbers;
};

const createMagicSquareGame = () => {
  const magicSquare = generateMagicSquare(gridSize);
  const missingNumbers = getRandomMissingNumbers(gridSize);

  const magicSquareGameDiv = document.getElementById('magicSquareGame');
  magicSquareGameDiv.innerHTML = '';

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cellValue = magicSquare[row][col];
      const cellInput = document.createElement('input');
      cellInput.type = 'text';
      cellInput.maxLength = 1;

      if (missingNumbers.has(cellValue)) {
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
  checkButton.addEventListener('click', checkMagicSquare);
  magicSquareGameDiv.appendChild(checkButton);
};

const checkMagicSquare = () => {
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
  } else {
    alert('Oops! Some numbers are incorrect. Please try again.');
  }
};

createMagicSquareGame();
