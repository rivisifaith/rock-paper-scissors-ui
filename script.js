const computer = document.querySelector(".computer img");
const player = document.querySelector(".player img");
const computerPoints = document.querySelector(".computerPoints");
const playerPoints = document.querySelector(".playerPoints");
const options = document.querySelectorAll(".options button");
const winnerMessage = document.querySelector(".winner-message");
const rateGameButton = document.getElementById("rate-game");
const viewResultsButton = document.getElementById("view-results");
const exitGameButton = document.getElementById("exit-game");
const ratingModal = document.getElementById("rating-modal");
const closeRatingModal = document.querySelector(".close");
const submitRatingButton = document.getElementById("submit-rating");

let gameInterval;
let gameActive = false;

function endGame() {
  clearInterval(gameInterval);
  gameActive = false;
  alert("Game over! Time's up!");
  showWinner();
}

function startGameTimer() {
  if (!gameActive) {
    gameActive = true;
    gameInterval = setTimeout(endGame, 180000); // 3 minutes
  }
}

function showWinner() {
  const cPoints = parseInt(computerPoints.innerHTML);
  const pPoints = parseInt(playerPoints.innerHTML);

  winnerMessage.innerHTML = ""; // Clear previous message

  if (cPoints > pPoints) {
    winnerMessage.innerHTML = `<div class="winner-line">Winner: Computer</div><div class="loser-line">Loser: Player</div>`;
  } else if (pPoints > cPoints) {
    winnerMessage.innerHTML = `<div class="winner-line">Winner: Player</div><div class="loser-line">Loser: Computer</div>`;
  } else {
    winnerMessage.innerHTML = "It's a tie!";
  }
}

options.forEach(option => {
  option.addEventListener("click", () => {
    startGameTimer();
    computer.classList.add("shakeComputer");
    player.classList.add("shakePlayer");

    setTimeout(() => {
      computer.classList.remove("shakeComputer");
      player.classList.remove("shakePlayer");

      player.src = "./" + option.innerHTML + "Player.png";

      const choice = ["ROCK", "PAPER", "SCISSORS"];
      let arrayNo = Math.floor(Math.random() * 3);
      let computerChoice = choice[arrayNo];
      computer.src = "./" + computerChoice + "Computer.png";

      let cPoints = parseInt(computerPoints.innerHTML);
      let pPoints = parseInt(playerPoints.innerHTML);

      if (option.innerHTML === "ROCK") {
        if (computerChoice === "PAPER") {
          computerPoints.innerHTML = cPoints + 1;
        } else if (computerChoice === "SCISSORS") {
          playerPoints.innerHTML = pPoints + 1;
        }
      } else if (option.innerHTML === "PAPER") {
        if (computerChoice === "SCISSORS") {
          computerPoints.innerHTML = cPoints + 1;
        } else if (computerChoice === "ROCK") {
          playerPoints.innerHTML = pPoints + 1;
        }
      } else {
        if (computerChoice === "ROCK") {
          computerPoints.innerHTML = cPoints + 1;
        } else if (computerChoice === "PAPER") {
          playerPoints.innerHTML = pPoints + 1;
        }
      }
      showWinner();
    }, 900);
  });
});

document.querySelector('.fixed-images').classList.add('fade-out');


rateGameButton.addEventListener("click", () => {
  ratingModal.style.display = "block";
});

closeRatingModal.addEventListener("click", () => {
  ratingModal.style.display = "none";
});

submitRatingButton.addEventListener("click", () => {
  const rating = document.getElementById("rating").value;
  const comment = document.getElementById("comment").value;
  alert(`Thank you for your rating of ${rating} and comment: "${comment}"`);
  ratingModal.style.display = "none";
});

viewResultsButton.addEventListener("click", () => {
  const cPoints = parseInt(computerPoints.innerHTML);
  const pPoints = parseInt(playerPoints.innerHTML);
  let resultMessage = "";

  if (cPoints > pPoints) {
    resultMessage = `Winner: Computer\nLoser: Player`;
  } else if (pPoints > cPoints) {
    resultMessage = `Winner: Player\nLoser: Computer`;
  } else {
    resultMessage = `It's a tie!`;
  }

  alert(`Current Score:\nComputer: ${computerPoints.innerHTML}\nPlayer: ${playerPoints.innerHTML}\n\n${resultMessage}`);
});

exitGameButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to exit the game?")) {
    window.close(); // Note: This may not work in some browsers for security reasons.
  }
});





