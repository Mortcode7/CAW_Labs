window.onload = function () {
  let gameStarted = false;
  let gameLost = false;

  const boundaries = document.querySelectorAll(".boundary");
  const start = document.getElementById("start");
  const end = document.getElementById("end");
  const status = document.getElementById("status");
  const maze = document.getElementById("maze");

  // Exercise 1: Single boundary turns red
  boundaries.forEach((boundary) => {
    boundary.addEventListener("mouseover", function () {
      if (gameStarted) {
        loseGame();
      }
    });
  });

  // Exercise 4: Restart the maze when start is clicked
  start.addEventListener("click", resetGame);

  // Exercise 2: End the game when the mouse reaches the "E" without hitting the walls
  end.addEventListener("mouseover", function () {
    if (gameStarted && !gameLost) {
      winGame();
    }
    boundaries.forEach(function (boundary) {
      boundary.style.backgroundColor = "green";
    });
  });

  // Exercise 7: Detect if mouse leaves the maze area (cheating)
  maze.addEventListener("mouseleave", function () {
    if (gameStarted) {
      loseGame();
    }
  });

  // Helper function: To turn all boundaries red and mark the game as lost
  function loseGame() {
    boundaries.forEach((boundary) => {
      boundary.classList.add("youlose");
    });
    gameLost = true;
    status.textContent = "You lose!";
  }

  // Helper function: Reset the game state
  function resetGame() {
    boundaries.forEach((boundary) => {
      boundary.classList.remove("youlose");
    });
    gameStarted = true;
    gameLost = false;
    status.textContent = 'Move your mouse over the "S" to begin.';
  }

  // Helper function: When the user wins by reaching the end without touching walls
  function winGame() {
    
    gameStarted = false;
    
    status.textContent = "You win!";
    
  }
// Add an event listener for when the user clicks the start button
    start.addEventListener('click', function() {
        // Reset all boundaries to their original color
        boundaries.forEach(function(boundary) {
            boundary.style.backgroundColor = "#eeeeee"; // Reset to original gray color
        });});
  

};
