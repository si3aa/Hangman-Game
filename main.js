// Constants
const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const WORDS = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Gandhi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};
const MAX_WRONG_ATTEMPTS = 8;

// DOM Elements
const elements = {
  splashScreen: document.querySelector(".splash"),
  lettersContainer: document.querySelector(".letters"),
  categorySpan: document.querySelector(".game-info .category span"),
  lettersGuessContainer: document.querySelector(".letters-guess"),
  hangmanDraw: document.querySelector(".hangman-draw"),
  sounds: {
    victory: document.getElementById("win"),
    fail: document.getElementById("fail"),
    success: document.getElementById("success"),
    gameOver: document.getElementById("game-over"),
  },
};

// Game State
let wrongAttempts = 0;
let chosenWord = "";
let guessSpans = [];
let canClick = true; // Tracks if user can click a letter

// Initialize Game
function initGame() {
  elements.splashScreen.style.display = "none"; // Hide splash screen on start
  generateLetters();
  setupRandomWord();
  document.addEventListener("click", handleClick);
  preventInspect();
  preventSelection();
}

// Generate Alphabet Letters
function generateLetters() {
  LETTERS.split("").forEach((letter) => {
    const span = document.createElement("span");
    span.textContent = letter;
    span.className = "letter-box";
    elements.lettersContainer.appendChild(span);
  });
}

// Setup Random Word and Guess Spans
function setupRandomWord() {
  const categories = Object.keys(WORDS);
  const randomCategory =
    categories[Math.floor(Math.random() * categories.length)];
  const wordsInCategory = WORDS[randomCategory];
  chosenWord =
    wordsInCategory[Math.floor(Math.random() * wordsInCategory.length)];

  elements.categorySpan.textContent = randomCategory;
  elements.lettersGuessContainer.innerHTML = "";
  chosenWord.split("").forEach((letter) => {
    const span = document.createElement("span");
    if (letter === " ") span.className = "with-space";
    elements.lettersGuessContainer.appendChild(span);
  });
  guessSpans = document.querySelectorAll(".letters-guess span");
}

// Handle Clicks with Debounce
function handleClick(e) {
  if (!canClick) return; // Ignore clicks during delay
  if (
    e.target.classList.contains("letter-box") &&
    !e.target.classList.contains("clicked")
  ) {
    canClick = false; // Disable further clicks
    setTimeout(() => {
      canClick = true;
    }, 1000);

    const letter = e.target.textContent.toLowerCase();
    e.target.classList.add("clicked");

    let isCorrect = false;
    chosenWord
      .toLowerCase()
      .split("")
      .forEach((wordLetter, i) => {
        if (wordLetter === letter) {
          isCorrect = true;
          guessSpans[i].textContent = letter;
        }
      });

    if (isCorrect) {
      playSound(elements.sounds.success);
      if (checkWin()) showWinSplash();
    } else {
      wrongAttempts++;
      elements.hangmanDraw.classList.add(`wrong-${wrongAttempts}`);
      playSound(elements.sounds.fail);
      if (wrongAttempts === MAX_WRONG_ATTEMPTS) showLoseSplash();
    }
  }
}

// Check Win Condition
function checkWin() {
  return Array.from(guessSpans).every(
    (span) => span.textContent || span.classList.contains("with-space")
  );
}

// Play Sound
function playSound(sound) {
  sound?.play().catch(() => {});
}

// Show Win Splash with Confetti
function showWinSplash() {
  elements.lettersContainer.classList.add("finished");
  playSound(elements.sounds.victory);
  showSplash(
    "Congratulations! You Won!",
    "🎉 You guessed the word correctly!",
    true
  );
  triggerConfetti();
}

// Show Lose Splash
function showLoseSplash() {
  elements.lettersContainer.classList.add("finished");
  playSound(elements.sounds.gameOver);
  showSplash("Game Over", `The word was "${chosenWord}". Try again!`, false);
}

// Show Splash Screen with Popup
function showSplash(title, message, isWin) {
  elements.splashScreen.innerHTML = `
    <div class="popup ${isWin ? "win" : "lose"}">
      <h2>${title}</h2>
      <p>${message}</p>
      <button onclick="restartGame()">Restart Game</button>
    </div>
  `;
  elements.splashScreen.style.display = "flex";
}

// Trigger Confetti Animation
function triggerConfetti() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
}

// Prevent Text Selection
function preventSelection() {
  document.body.style.userSelect = "none";
  document.body.style.webkitUserSelect = "none";
  document.body.style.msUserSelect = "none";
}

// Prevent Inspect Tool
function preventInspect() {
  document.addEventListener("contextmenu", (e) => e.preventDefault());
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && ["I", "C", "J"].includes(e.key)) ||
      (e.ctrlKey && e.key === "U")
    ) {
      e.preventDefault();
    }
  });
}

// Restart Game
function restartGame() {
  window.location.reload();
}

// Start Game
initGame();
