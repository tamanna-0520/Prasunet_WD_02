let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const display = document.getElementById('time');
const startStopBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function updateDisplay() {
    const time = Date.now() - startTime + elapsedTime;
    const minutes = Math.floor(time / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((time % 60000) / 1000).toString().padStart(2, '0');
    const milliseconds = Math.floor((time % 1000) / 10).toString().padStart(2, '0');
    display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function startStop() {
    if (isRunning) {
        elapsedTime += Date.now() - startTime;
        clearInterval(timer);
        startStopBtn.textContent = 'START';
    } else {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 10);
        startStopBtn.textContent = 'STOP';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'START';
    laps.innerHTML = '';
}

function recordLap() {
    if (!isRunning) return;
    const lapTime = display.textContent;
    const li = document.createElement('li');
    li.textContent = lapTime;
    laps.appendChild(li);
}

startBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
