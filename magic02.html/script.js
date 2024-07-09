function generateMagicSquare(n, sum) {
    // Create an empty matrix
    var magicSquare = [];
    for (var i = 0; i < n; i++) {
      magicSquare.push([]);
      for (var j = 0; j < n; j++) {
        magicSquare[i].push(0);
      }
    }
  
    var row = Math.floor(n / 2); // Start position for 1
    var col = Math.floor(n / 2); // Start position for 1
    var currentNum = 1;
  
    var usedNumbers = {}; // Track used numbers
  
    while (currentNum <= n * n) {
      magicSquare[row][col] = currentNum;
      usedNumbers[currentNum] = true; // Mark number as used
      currentNum++;
  
      // Move to the next position
      row--;
      col++;
  
      // Wrap around if needed
      if (row < 0) {
        row = n - 1;
      }
      if (col === n) {
        col = 0;
      }
  
      // Check if the current position is already filled or the number is already used
      if (magicSquare[row][col] !== 0 || usedNumbers[currentNum]) {
        // Move down one position
        row++;
        col--;
  
        // Wrap around if needed
        if (row === n) {
          row = 0;
        }
        if (col < 0) {
          col = n - 1;
        }
      }
    }
  
    // Adjust the sum of each row to match the given sum
    var expectedSum = (n * n * (n * n + 1)) / (2 * n);
    var adjustment = sum - expectedSum;
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        magicSquare[i][j] += adjustment;
      }
    }
  
    // Return the generated magic square
    return magicSquare;
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    var magicSquareForm = document.getElementById("magicSquareForm");
    var magicSquareOutput = document.getElementById("magicSquareOutput");
  
    magicSquareForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      var sumInput = document.getElementById("sumInput");
      var dimensionInput = document.getElementById("dimensionInput");
  
      var sum = parseInt(sumInput.value);
      var dimension = parseInt(dimensionInput.value);
  
      var magicSquare = generateMagicSquare(dimension, sum);
  
      // Display the magic square
      var outputHTML = "<h2>Magic Square:</h2><table>";
      for (var i = 0; i < dimension; i++) {
        outputHTML += "<tr>";
        for (var j = 0; j < dimension; j++) {
          outputHTML += "<td>" + magicSquare[i][j] + "</td>";
        }
        outputHTML += "</tr>";
      }
      outputHTML += "</table>";
  
      magicSquareOutput.innerHTML = outputHTML;
    });
  });
  