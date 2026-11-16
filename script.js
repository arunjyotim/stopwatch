const startBtn = document.getElementById('start-btn');
const lapBtn = document.getElementById('lap-btn');
const resetBtn = document.getElementById('reset-btn');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');
const lapsList = document.getElementById('laps-list');
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;
let laps = [];
function formatTime(time) {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);
  return {
    m: String(minutes).padStart(2, '0'),
    s: String(seconds).padStart(2, '0'),
    ms: String(milliseconds).padStart(2, '0')
  };
}
function updateDisplay() {
  const current = elapsedTime + (isRunning ? Date.now() - startTime : 0);
  const formatted = formatTime(current);
  minutesEl.textContent = formatted.m;
  secondsEl.textContent = formatted.s;
  millisecondsEl.textContent = formatted.ms;
}
function startStopwatch() {
  if (!isRunning) {
    startTime = Date.now();
    timerInterval = setInterval(updateDisplay, 10);
    isRunning = true;
    startBtn.textContent = 'Stop';
    lapBtn.disabled = false;
    resetBtn.disabled = false;
  } else {
    elapsedTime += Date.now() - startTime;
    clearInterval(timerInterval);
    isRunning = false;
    startBtn.textContent = 'Start';
    lapBtn.disabled = true;
  }
  updateDisplay();
}
function recordLap() {
  if (!isRunning) {
    return;
  }
  const current = elapsedTime + (Date.now() - startTime);
  const formatted = formatTime(current);
  laps.unshift(formatted);
  renderLaps();
}
function renderLaps() {
  lapsList.innerHTML = '';
  laps.forEach((lap, index) => {
    const lapNumber = laps.length - index;
    const li = document.createElement('li');
    li.className = 'lap-item';
    const lapNumSpan = document.createElement('span');
    lapNumSpan.textContent = 'Lap ' + lapNumber;
    const lapTimeSpan = document.createElement('span');
    lapTimeSpan.textContent = lap.m + ':' + lap.s + '.' + lap.ms;
    li.appendChild(lapNumSpan);
    li.appendChild(lapTimeSpan);
    lapsList.appendChild(li);
  });
}
function resetStopwatch() {
  clearInterval(timerInterval);
  isRunning = false;
  startTime = 0;
  elapsedTime = 0;
  laps = [];
  startBtn.textContent = 'Start';
  lapBtn.disabled = true;
  resetBtn.disabled = true;
  updateDisplay();
  lapsList.innerHTML = '';
}
startBtn.addEventListener('click', startStopwatch);
lapBtn.addEventListener('click', recordLap);
resetBtn.addEventListener('click', resetStopwatch);
