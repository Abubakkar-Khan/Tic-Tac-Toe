const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board');
const restartButton = document.getElementById('restartButton');
let isCircleTurn;

// Initialize game
function startGame() {
    isCircleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS, CIRCLE_CLASS);
        cell.textContent = '';
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
}

// Handle a cell click
function handleClick(e) {
    const cell = e.target;
    const currentClass = isCircleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

// End game and show result
function endGame(draw) {
    alert(draw ? 'It\'s a Draw!' : `${isCircleTurn ? "O's" : "X's"} Wins!`);
    startGame();
}

// Check for a draw
function isDraw() {
    return [...cellElements].every(cell =>
        cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
}

// Place mark on the board
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.textContent = currentClass === X_CLASS ? 'X' : 'O';
}

// Swap turns
function swapTurns() {
    isCircleTurn = !isCircleTurn;
}

// Check if the current player has won
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination =>
        combination.every(index => cellElements[index].classList.contains(currentClass))
    );
}

// Event listeners
restartButton.addEventListener('click', startGame);

// Start the game initially
startGame();
