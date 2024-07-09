function generateRandomSum() {
    return Math.floor(Math.random() * 21); // Generate a random number between 0 and 20
  }
  
  function generateMagicSquare(size, sum) {
    var a = [];
    for (var i = 0; i < size; i++) {
      a.push([]);
      for (var j = 0; j < size; j++) {
        a[i].push(0);
      }
    }
  
    var s = size * size;
    var j = Math.floor(size / 2);
    var i = 0;
  
    for (var k = 1; k <= s; k++) {
      a[i][j] = k;
      i--;
      j++;
  
      if (k % size === 0) {
        i += 2;
        j--;
      } else {
        if (j === size) {
          j -= size;
        } else if (i < 0) {
          i += size;
        }
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
  
      if (size === 0 || size % 2 === 0) {
        magicSquareOutput.innerHTML = "<p>Invalid size. Please enter an odd positive number.</p>";
      } else {
        var sum = generateRandomSum();
        var magicSquare = generateMagicSquare(size, sum);
  
        var outputHTML = "<h2>Magic Square (Sum: " + sum + "):</h2><table>";
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
  