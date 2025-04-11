// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";
// Sounds
const sounds = {
  victory: document.getElementById("win"),
  fail: document.getElementById("fail"),
  success: document.getElementById("success"),
  gameOver: document.getElementById("game-over"),
};
// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach((letter) => {
  // Create Span
  let span = document.createElement("span");

  // Create Letter Text Node
  let theLetter = document.createTextNode(letter);

  // Append The Letter To Span
  span.appendChild(theLetter);

  // Add Class On Span
  span.className = "letter-box";

  // Append Span To The Letters Container
  lettersContainer.appendChild(span);
});
// Object Of Words + Categories
const words = {
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
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};
// Get Random Property
let allKeys = Object.keys(words);
// Random Number Depend On Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
// Category
let randomPropName = allKeys[randomPropNumber];
// Category Words
let randomPropValue = words[randomPropName];
// Random Number Depend On Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
// The Chosen Word
let randomValueValue = randomPropValue[randomValueNumber];
// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;
// Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");
//Convert Chosen Word To Array
let lettersAndSpaces = Array.from(randomValueValue);
// Create Spans Depend On Words
lettersAndSpaces.forEach((letter) => {
  // Craere Empty Span
  let emptySpan = document.createElement("span");
  // If Letter Is Space
  if (letter === " ") {
    //Add Class To Span
    emptySpan.className = "with-space";
  }
  //Append Span To Letters Guess Container
  lettersGuessContainer.appendChild(emptySpan);
});
// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");
// Set Wrong Attempts
let wrongAttempts = 0;
// Select Hangman Draw
let theDraw = document.querySelector(".hangman-draw");
// Handle Clicking On Letters
document.addEventListener("click", (e) => {
  // Set THe Chosen Status
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    //Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();
    //Chosen word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());
    theChosenWord.forEach((wordLetter, wordIndex) => {
      // If Clicked Letter Equal To One Of The Chosen Word Lettre
      if (theClickedLetter === wordLetter) {
        theStatus = true;
        //Loop On Guess Spans
        guessSpans.forEach((span, spanIndex) => {
          //If The Index Equal To The Word Index
          if (wordIndex === spanIndex) {
            //Add The Letter To The Span
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });
    // If The Status Is False
    if (theStatus !== true) {
      // Increase Wrong Attempts
      wrongAttempts++;
      // Add Class To The Draw
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      // Play Fail Sound
      sounds.fail.play();
      if (wrongAttempts === 8) {
        endGame();
        // Play Game Over Sound
        sounds.gameOver.play();

        lettersContainer.classList.add("finished");
      }
    } else {
      // Play Success Sound
      sounds.success.play();
    }
  }
});
// End Game Function
function endGame() {
  // Create Popup Div
  let div = document.createElement("div");

  // Create Text
  let divText = document.createTextNode(
    `Game Over, The Word Is ${randomValueValue}`
  );

  // Append Text To Div
  div.appendChild(divText);

  // Add Class On Div
  div.className = "popup";

  // Append To The Body
  document.body.appendChild(div);
}
