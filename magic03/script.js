function generateRandomSum(size) {
  if (size === 3) {
    return Math.floor(Math.random() * 10); // Generate a random number between 0 and 9
  } else if (size === 4) {
    return Math.floor(Math.random() * 17); // Generate a random number between 0 and 16
  } else {
    return 0;
  }
}

function generateMagicSquare(size, sum) {
  var a = [];
  for (var i = 0; i < size; i++) {
    a.push([]);
    for (var j = 0; j < size; j++) {
      a[i].push(0);
    }
  }

  var numElements = size * size;
  var row = Math.floor(size / 2);
  var col = size - 1;

  for (var num = 1; num <= numElements; num++) {
    a[row][col] = num;

    row--;
    col++;

    if (row === -1 && col === size) {
      row = 0;
      col = size - 2;
    } else if (row === -1) {
      row = size - 1;
    } else if (col === size) {
      col = 0;
    } else if (a[row][col] !== 0) {
      row++;
      col -= 2;
    }
  }

  var expectedSum = (size * (size * size + 1)) / 2;
  var adjustment = sum - expectedSum;

  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      a[i][j] += adjustment;
    }
  }

  return a;
}

document.addEventListener("DOMContentLoaded", function () {
  var magicSquareForm = document.getElementById("magicSquareForm");
  var magicSquareOutput = document.getElementById("magicSquareOutput");

  magicSquareForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var sizeInput = document.getElementById("sizeInput");
    var size = parseInt(sizeInput.value);

    if (size !== 3 && size !== 4) {
      magicSquareOutput.innerHTML = "<p>Invalid size. Please enter either 3 or 4.</p>";
    } else {
      var sum = generateRandomSum(size);
      var magicSquare = generateMagicSquare(size, sum);

      var outputHTML = "<h2>Magic Square (Size: " + size + "x" + size + ", Sum: " + sum + "):</h2><table>";
      for (var i = 0; i < size; i++) {
        outputHTML += "<tr>";
        for (var j = 0; j < size; j++) {
          outputHTML += "<td>" + magicSquare[i][j] + "</td>";
        }
        outputHTML += "</tr>";
      }
      outputHTML += "</table>";

      magicSquareOutput.innerHTML = outputHTML;
    }
  });
});
