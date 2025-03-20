let timeLeft = 61;
const timerElement = document.getElementById("timer");

const countdown = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `TIME: ${timeLeft}`; // "TIME:" ekledik

    if (timeLeft <= 10) {
        timerElement.style.color = "red";
    }

    if (timeLeft <= 0) {
        clearInterval(countdown);
        timerElement.textContent = "TIME: Tijd is om!";
    }
}, 1000);
