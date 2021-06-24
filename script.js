const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minEl = document.getElementById("min");
const secEl = document.getElementById("sec");

const endTime = new Date("July 1 2021 23:59:59");

countdown();

setInterval(countdown, 1000);

function countdown() {
    const startTime = new Date();
    const diff = endTime - startTime;
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const seconds = Math.floor(diff / 1000) % 60;
    daysEl.innerHTML = days;
    hoursEl.innerHTML = hours < 10 ? "0" + hours : hours;
    minEl.innerHTML = minutes < 10 ? "0" + minutes : minutes;
    secEl.innerHTML = seconds < 10 ? "0" + seconds : seconds;
}
