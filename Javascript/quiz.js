let timeLeft = 60;
console.log("Test TEST")
const timerElement = document.getElementById("timer");
const scoreElement = document.querySelector(".al");
timerElement.style.color = "white";
timerElement.style.fontSize = "1.8rem";
timerElement.style.marginRight = "1rem";

let scoreTeller = 0




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

  console.log("Quiz data:", data);

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
        scoreTeller = scoreTeller + 30;
        scoreElement.textContent = scoreTeller;
        setTimeout(() => {
          loadNewQuiz(); // laad nieuwe vraag
        }, 500);
      } else {
        div.style.backgroundColor = "red";
        if(scoreTeller <= 0){
          scoreElement.textContent = 0;
        }
        else{
          scoreTeller = scoreTeller - 30;
          scoreElement.textContent = scoreTeller;
        }
      }
    });

    optionsContainer.appendChild(div);
  });
}
loadNewQuiz();