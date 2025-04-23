let timeLeft = 3;
const timerElement = document.getElementById("timer");
timerElement.style.color = "white";
timerElement.style.fontSize = "1.8rem";
timerElement.style.marginRight = "1rem";

const countdown = setInterval(() => {
  timeLeft--;
  timerElement.textContent = `⏱ ${timeLeft}s`; // "TIME:" ekledik

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
