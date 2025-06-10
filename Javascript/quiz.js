let timeLeft = 10;
let countdown;
let scoreTeller = 0;
let isPaused = false;

const timerElement = document.getElementById("timer");
const scoreElement = document.querySelector(".al");
const pauseButton = document.querySelector(".pause-button");

timerElement.style.color = "white";
timerElement.style.fontSize = "1.8rem";
timerElement.style.marginRight = "1rem";

const clockSound = new Audio('/assets/clock-tick.mp3');
const failSound = new Audio('/assets/fail.mp3');
const trueSound = new Audio('/assets/true.mp3');
clockSound.loop = true;

function showPopup(title, message) {
  const popup = document.getElementById("popup");
  const popupTitle = document.getElementById("popup-title");
  const popupMessage = document.getElementById("popup-message");
  const popupScore = document.getElementById("popup-score");

  popupTitle.textContent = title;
  popupMessage.textContent = message;

  if (popupScore) {
    popupScore.textContent = scoreTeller;
  }

  
  fetch('/api/save-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ score: scoreTeller })
  })
    .then(res => res.json())
    .then(data => console.log(data.message))
    .catch(err => console.error("Fout bij opslaan score:", err));

  popup.classList.remove("hidden");
  clockSound.pause();
}


document.addEventListener("DOMContentLoaded", () => {
  const restartBtn = document.getElementById("restart-btn");
  if (restartBtn) {
    restartBtn.addEventListener("click", restartGame);
  }

  const tipButton = document.querySelector(".tips-button");
  tipButton.addEventListener("click", gebruikTip);

  if (pauseButton) {
    pauseButton.addEventListener("click", togglePause);
  }

  loadNewQuiz();
});

function restartGame() {
  
  location.reload(); 


  loadNewQuiz();
}

function startTimer() {
  clearInterval(countdown);
  timerElement.style.color = "white";
  timerElement.style.fontWeight = "normal";
  timerElement.style.fontSize = "1.8rem";
  timerElement.textContent = `⏱ ${timeLeft}s`;

  clockSound.pause();
  clockSound.currentTime = 0;

  countdown = setInterval(() => {
    if (!isPaused) {
      timeLeft--;
      timerElement.textContent = `⏱ ${timeLeft}s`;

      if (timeLeft <= 5) {
        timerElement.style.color = "red";
        if (clockSound.paused) {
          clockSound.play();
        }
      } else {
        if (!clockSound.paused) {
          clockSound.pause();
          clockSound.currentTime = 0;
        }
      }

      if (timeLeft <= 0) {
        clearInterval(countdown);
        clockSound.pause();
        timerElement.textContent = "⏱ Tijd is op!";
        timerElement.style.color = "red";
        timerElement.style.fontWeight = "bold";
        timerElement.style.fontSize = "2rem";
        endGame("⏱ Tijd is op!");
      }
    }
  }, 1000);
}
function resetTimeLeft() {
  if (scoreTeller > 300) {
    timeLeft = 5;
  } else if (scoreTeller > 200) {
    timeLeft = 7;
  } else {
    timeLeft = 10;
  }
}

function togglePause() {
  if (!isPaused) {
    clearInterval(countdown);
    clockSound.pause();
    pauseButton.innerHTML = `<i class="fas fa-play"></i>`;
    isPaused = true;
  } else {
    isPaused = false;
    pauseButton.innerHTML = `<i class="fas fa-pause"></i>`;
    startTimer();
  }
}

function endGame(message) {
  clearInterval(countdown);
  timerElement.textContent = message;
  timerElement.style.color = "red";
  timerElement.style.fontWeight = "bold";
  timerElement.style.fontSize = "2rem";
  clockSound.pause();

  const options = document.querySelectorAll(".option");
  options.forEach(opt => {
    opt.style.pointerEvents = "none";
  });
  failSound.play().catch(e => console.log("Audio play error:", e));
  showPopup("⏱ Tijd is op!");
}

async function loadNewQuiz() {
  startTimer();

  const res = await fetch("/api/quiz");
  const data = await res.json();

  const logoImg = document.querySelector(".team-logo");
  logoImg.src = data.logoUrl;

  const optionsContainer = document.querySelector(".options");
  optionsContainer.innerHTML = "";

  data.options.forEach((opt) => {
    const div = document.createElement("div");
    div.classList.add("option");
    div.dataset.correct = opt === data.correctAnswer;
    div.textContent = opt;

    div.addEventListener("click", () => {
      clearInterval(countdown);

      if (div.dataset.correct === "true") {
        div.style.backgroundColor = "green";
        div.style.border = "none";
        scoreTeller += 30;
        scoreElement.textContent = scoreTeller;
        trueSound.play().catch(e => console.log("Audio play error:", e));
        resetTimeLeft();

        setTimeout(() => {
          loadNewQuiz();
        }, 500);
      } else {
        failSound.play().catch(e => console.log("Audio play error:", e));
        div.style.backgroundColor = "red";
        if (scoreTeller > 0) {
          scoreTeller -= 30;
        }
        scoreElement.textContent = scoreTeller;
        showPopup("Fout!", "Je hebt een fout antwoord gegeven.");
      }
    });

    optionsContainer.appendChild(div);
  });
}

function gebruikTip() {
  const opties = Array.from(document.querySelectorAll(".option"));
  const fouteOpties = opties.filter(optie => optie.dataset.correct === "false");
  const teVerwijderen = getRandomElements(fouteOpties, 2);

  teVerwijderen.forEach(optie => {
    optie.remove();
    scoreTeller -= 30;
    if (scoreTeller < 0) scoreTeller = 0;
    scoreElement.textContent = scoreTeller;
  });
}

function getRandomElements(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
fetch('/api/save-score', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ score: scoreTeller })
});


