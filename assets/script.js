let startTime = 0;
let elapsedTime = 0;
let interval = null;
let lapCount = 1;

const timerDisplay = document.getElementById("display");
const lapsContainer = document.getElementById("laps");
const startStopBtn = document.getElementById("startStop");

function updateDisplay() {
  const totalElapsed = Date.now() - startTime + elapsedTime;
  const minutes = Math.floor(totalElapsed / 60000);
  const seconds = Math.floor((totalElapsed % 60000) / 1000);
  const milliseconds = Math.floor((totalElapsed % 1000) / 10);

  timerDisplay.innerText =
    `${String(minutes).padStart(2, '0')}:` +
    `${String(seconds).padStart(2, '0')}:` +
    `${String(milliseconds).padStart(2, '0')}`;
}

function startTimer() {
  startTime = Date.now();
  interval = setInterval(updateDisplay, 10);
}

function stopTimer() {
  clearInterval(interval);
  elapsedTime += Date.now() - startTime;
}

function resetAll() {
  clearInterval(interval);
  startTime = 0;
  elapsedTime = 0;
  timerDisplay.innerText = "00:00:00";
  startStopBtn.innerText = "Start";
  startStopBtn.classList.remove("pause");
  startStopBtn.classList.add("start");
  timerDisplay.classList.remove("paused");
  lapsContainer.innerHTML = "";
  lapCount = 1;
}

startStopBtn.addEventListener("click", function () {
  if (this.innerText === "Start") {
    startTimer();
    this.innerText = "Pause";
    this.classList.remove("start");
    this.classList.add("pause");
    timerDisplay.classList.remove("paused");
  } else if (this.innerText === "Pause") {
    stopTimer();
    this.innerText = "Resume";
    this.classList.remove("pause");
    this.classList.add("start");
    timerDisplay.classList.add("paused");
  } else if (this.innerText === "Resume") {
    startTimer();
    this.innerText = "Pause";
    this.classList.remove("start");
    this.classList.add("pause");
    timerDisplay.classList.remove("paused");
  }
});

document.getElementById("reset").addEventListener("click", resetAll);

document.getElementById("lap").addEventListener("click", function () {
  const li = document.createElement("li");
  li.innerText = `Lap ${lapCount++}: ${timerDisplay.innerText}`;
  lapsContainer.appendChild(li);
  lapsContainer.scrollTop = lapsContainer.scrollHeight;
});

document.getElementById("clearLaps").addEventListener("click", resetAll);
