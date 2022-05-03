const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

const completeEl = document.getElementById("complete");
const completeElInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = new Date();
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input minimum with today's Date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

// Populate Countwodn / Complete UI
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        let distance = countdownValue - now;

        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        inputContainer.hidden = true;

        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finishied on ${countdownDate}`;
            completeEl.hidden = false;
        } else {
            // Populate countdown
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;

            completeEl.hidden = true;
            countdownEl.hidden = false;
        }
    }, second);
}

function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
    localStorage.setItem("countdown", JSON.stringify(savedCountdown));
    if (countdownDate !== "") {
        // Get number version of  current Date
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

function reset() {
    inputContainer.hidden = false;
    countdownEl.hidden = true;
    completeEl.hidden = true;
    clearInterval(countdownActive);
    countdownTitle = "";
    countdownDate = "";
}

function restoreCountdown() {
    if (localStorage.getItem("countdown")) {
        savedCountdown = JSON.parse(localStorage.getItem("countdown"));
        inputContainer.hidden = true;
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Event Listeners
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);

// On Load
restoreCountdown();
