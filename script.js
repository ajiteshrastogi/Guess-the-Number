let secretNumber = Math.floor(Math.random() * 100) + 1;
const maxGuesses = 10;

const submit = document.getElementById('guessButton');
const guessInput = document.getElementById('guessInput');
const guessSlot = document.getElementById('guessesMade');
const remain = document.getElementById('guessesLeft');
const messageDisplay = document.getElementById('message');
const startOver = document.querySelector('.info');

const p = document.createElement('p'); // restart button

let numGuess = 1; 
let prevGuess = [];
let playGame = true;

submit.addEventListener('click', function (e) {
  e.preventDefault();
  if (!playGame) return;
  const guess = parseInt(guessInput.value);
  validateGuess(guess);
});

function validateGuess(guess) {
  if (isNaN(guess)) {
    messageDisplay.textContent = "Please enter a valid number!";
    messageDisplay.className = "message error";
    return;
  } else if (guess < 1) {
    messageDisplay.textContent = "Please enter a number greater than 0!";
    messageDisplay.className = "message error";
    return;
  } else if (guess > 100) {
    messageDisplay.textContent = "Please enter a number less than or equal to 100!";
    messageDisplay.className = "message error";
    return;
  }
  
  // Record the guess
  prevGuess.push(guess);
  displayGuess(guess);
  
  if (guess === secretNumber) {
    messageDisplay.textContent = "Bravo! You've unlocked the secret!";
    messageDisplay.className = "message success";
    endGame();
  } else if (numGuess > maxGuesses) {
    displayMessage("Game Over! The secret was " + secretNumber);
    endGame();
  } else {
    checkGuess(guess);
  }
}

function checkGuess(guess) {
  if (guess < secretNumber) {
    messageDisplay.textContent = "Too low, try a higher number!";
    messageDisplay.className = "message";
  } else if (guess > secretNumber) {
    messageDisplay.textContent = "Too high, try a lower number!";
    messageDisplay.className = "message";
  }
}

function displayGuess(guess) {
  if (prevGuess.length === 1) {
    guessSlot.textContent = '';
  }
  guessSlot.innerHTML += guess + ', ';
  numGuess++;
  remain.textContent = maxGuesses - (numGuess - 1);
  guessInput.value = '';
  guessInput.focus();
}

function displayMessage(message) {
  messageDisplay.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
  guessInput.value = '';
  guessInput.setAttribute('disabled', '');
  p.classList.add('button');
  p.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameButton = document.getElementById('newGame');
  newGameButton.addEventListener('click', function () {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    prevGuess = [];
    numGuess = 1;
    guessSlot.textContent = 'None';
    remain.textContent = maxGuesses;
    guessInput.removeAttribute('disabled');
    messageDisplay.textContent = '';
    startOver.removeChild(p);
    playGame = true;
  });
}