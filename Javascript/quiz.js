let timeLeft = 60;
console.log("Test TEST")
const timerElement = document.getElementById("timer");
timerElement.style.color = "white";
timerElement.style.fontSize = "1.8rem";
timerElement.style.marginRight = "1rem";

document.querySelectorAll(".option").forEach(option => {
  option.addEventListener("click", () => {
    if (option.dataset.correct === "true") {
      option.style.backgroundColor = "green";
    } else {
      option.style.backgroundColor = "red";
    }
  });
});

const countdown = setInterval(() => {
  timeLeft--;
  timerElement.textContent = `⏱ ${timeLeft}s`; 

  if (timeLeft <= 10) {
    timerElement.style.color = "red";
  }

  if (timeLeft <= 0) {
    clearInterval(countdown);

    document.getElementById("timer").innerText = "Game over!";
    timerElement.style.fontWeight = 700;
    timerElement.style.fontSize = "2rem";
  }
}, 1000);

async function loadNewQuiz() {
  const res = await fetch("/api/quiz");

  const data = await res.json();

  const logoImg = document.querySelector(".team-logo");
logoImg.src = data.logoUrl;  // Zorg dat dit goed staat

  const optionsContainer = document.querySelector(".options");
  

  logoImg.src = data.logoUrl;

  optionsContainer.innerHTML = ""; // verwijder oude opties

  data.options.forEach((opt) => {
    const div = document.createElement("div");
    div.classList.add("option");
    div.dataset.correct = opt === data.correctAnswer;
    div.textContent = opt;

    div.addEventListener("click", () => {
      if (div.dataset.correct === "true") {
        div.style.backgroundColor = "green";
        div.style.border = "none"
        setTimeout(() => {
          loadNewQuiz(); // laad nieuwe vraag
        }, 1000);
      } else {
        div.style.backgroundColor = "red";
      }
    });

    optionsContainer.appendChild(div);
  });
}
loadNewQuiz();