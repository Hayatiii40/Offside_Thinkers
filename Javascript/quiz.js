let timeLeft = 10;
let countdown;
let scoreTeller = 0;

const timerElement = document.getElementById("timer");
const scoreElement = document.querySelector(".al");
timerElement.style.color = "white";
timerElement.style.fontSize = "1.8rem";
timerElement.style.marginRight = "1rem";

function startTimer() {
  clearInterval(countdown); // Reset vorige timer
  timeLeft = 10;
  timerElement.style.color = "white";
  timerElement.style.fontWeight = "normal";
  timerElement.style.fontSize = "1.8rem";
  timerElement.textContent = `⏱ ${timeLeft}s`;

  countdown = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `⏱ ${timeLeft}s`;

    if (timeLeft <= 5) {
      timerElement.style.color = "red";
    }

    if (timeLeft <= 0) {
      clearInterval(countdown);
      endGame("⏱ Tijd is op!");
    }
  }, 1000);
}

function endGame(message) {
  clearInterval(countdown);
  timerElement.textContent = message;
  timerElement.style.color = "red";
  timerElement.style.fontWeight = "bold";
  timerElement.style.fontSize = "2rem";

  // Opties disablen
  const options = document.querySelectorAll(".option");
  options.forEach(opt => {
    opt.style.pointerEvents = "none";
  });
}

async function loadNewQuiz() {
  startTimer(); // Start een nieuwe timer voor elke vraag

  const res = await fetch("/api/quiz");
  const data = await res.json();

  console.log("Quiz data:", data);

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
      clearInterval(countdown); // Stop de timer bij een klik

      if (div.dataset.correct === "true") {
        div.style.backgroundColor = "green";
        div.style.border = "none";
        scoreTeller += 30;
        scoreElement.textContent = scoreTeller;

        setTimeout(() => {
          loadNewQuiz();
        }, 500);
      } else {
        div.style.backgroundColor = "red";
        if (scoreTeller > 0) {
          scoreTeller -= 30;
        }
        scoreElement.textContent = scoreTeller;
        endGame("❌ Verkeerd antwoord!");
      }
    });

    optionsContainer.appendChild(div);
  });
}

loadNewQuiz();
