//game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

//ui elements
const gameWrapper = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

//assign ui min and max
minNum.textContent = min;
maxNum.textContent = max;

//play again event listener
gameWrapper.addEventListener("mousedown", function(e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

//listen for guess
guessBtn.addEventListener("click", function() {
  let guess = parseInt(guessInput.value);

  //validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  } else {
    //check if won
    if (guess === winningNum) {
      //game over  - won
      gameOver(true, `${winningNum} is correct! YOU WIN!`);
    } else {
      //wrong number
      guessesLeft -= 1;
      if (guessesLeft === 0) {
        gameOver(
          false,
          `Game Over, you lost. The correct number was ${winningNum}`
        );
      } else {
        //game continues  - wrong answer
        //change border color
        guessInput.style.borderColor = "red";
        //clear the input
        guessInput.value = "";
        //tell user its wrong number
        setMessage(
          `${guess} is not correct, ${guessesLeft} guesses left`,
          "red"
        );
      }
    }
  }
});

//game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  //disable input
  guessInput.disabled = true;
  //change border color
  guessInput.style.borderColor = color;
  //set message
  setMessage(msg, color);
  //play again
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

//get winning number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//set message
function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}
