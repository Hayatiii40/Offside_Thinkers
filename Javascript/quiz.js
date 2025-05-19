let timeLeft = 10;
let countdown;
let scoreTeller = 0;

const timerElement = document.getElementById("timer");
const scoreElement = document.querySelector(".al");
const quizcontainer = document.querySelector(".quiz-container");
const quizhead = document.querySelector(".quiz-head");
timerElement.style.color = "white";
timerElement.style.fontSize = "1.8rem";
timerElement.style.marginRight = "1rem";
scoreElement.style.fontSize = "30px"


function startTimer() {
  clearInterval(countdown);
  timeLeft = 10;
  timerElement.style.color = "white";
  timerElement.style.fontWeight = "normal";
  timerElement.style.fontSize = "30px";
  timerElement.textContent = `⏱ ${timeLeft}s`;

  // Reset animatiekleur naar blauw bij nieuwe vraag
  quizcontainer.classList.remove("red-glow");
  quizcontainer.classList.add("blue-glow");
  // quizhead.classList.remove("red-glow");
  // quizhead.classList.add("blue-glow");

  countdown = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `⏱ ${timeLeft}s`;

    if (timeLeft <= 5) {
      timerElement.style.color = "red";

      quizcontainer.classList.remove("blue-glow");
      quizcontainer.classList.add("red-glow");

      // quizhead.classList.remove("blue-glow");
      // quizhead.classList.add("red-glow");
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

      const allOptions = document.querySelectorAll(".option");

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
        quizcontainer.classList.remove("blue-glow");
        quizcontainer.classList.add("red-glow");

        
        allOptions.forEach(optEl => {
          if (optEl.dataset.correct === "true") {
            optEl.style.backgroundColor = "blue";
            optEl.style.color = "white";
          }
          // Opties disablen na fout antwoord
          optEl.style.pointerEvents = "none";
        });

        
        scoreElement.textContent = scoreTeller;

        // ❌ Toon foutmelding na korte vertraging
        setTimeout(() => {
          endGame("❌ Fout!");
        }, 800);
      }
    });

    optionsContainer.appendChild(div);
  });
}


loadNewQuiz();
