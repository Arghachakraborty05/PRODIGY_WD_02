let [ms, s, m] = [0, 0, 0];
let interval = null;
let lapCount = 1;

const timerDisplay = document.getElementById("display");
const lapsContainer = document.getElementById("laps");
const startStopBtn = document.getElementById("startStop");

function updateDisplay() {
  timerDisplay.innerText = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}:${String(ms).padStart(2, '0')}`;
}

function startTimer() {
  interval = setInterval(() => {
    ms++;
    if (ms === 50) { ms = 0; s++; }
    if (s === 60) { s = 0; m++; }
    updateDisplay();
  }, 20);
}

function stopTimer() {
  clearInterval(interval);
}

function resetAll() {
  stopTimer();
  [ms, s, m] = [0, 0, 0];
  updateDisplay();
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