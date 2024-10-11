const gameBoard = document.getElementById("gameBoard");
const message = document.getElementById("message");
const resetButton = document.getElementById("resetButton");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

// Create the 3x3 grid
function initializeGame() {
  gameBoard.innerHTML = "";
  board.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-cell-index", index);
    cell.addEventListener("click", handleCellClick);
    gameBoard.appendChild(cell);
  });
}

// Handle cell clicks
function handleCellClick(e) {
  const clickedCell = e.target;
  const cellIndex = clickedCell.getAttribute("data-cell-index");

  if (board[cellIndex] !== "" || !gameActive) {
    return;
  }

  board[cellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  checkResult();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Check for a winner or a draw
function checkResult() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    message.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    message.textContent = "It's a draw!";
    gameActive = false;
  }
}

// Reset the game
resetButton.addEventListener("click", () => {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  message.textContent = "";
  initializeGame();
});

initializeGame();
