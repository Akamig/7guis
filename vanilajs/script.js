let counterButton = document.getElementById("counter-button");
let celcius = document.getElementById("celcius");
let farenheit = document.getElementById("farenheit");
let flightSelector = document.getElementById("flight-type");
let go = document.getElementById("go");
let back = document.getElementById("back");
let flightBook = document.getElementById("flight-book");
let timeView = document.getElementById("time-view");
let timeRange = document.getElementById("time-range");
let timeSpan = document.getElementById("time-span");
let timeSet = document.getElementById("time-set");

back.disabled = true;

counterButton.onclick = count;

celcius.oninput = tempconv;
farenheit.oninput = tempconv;

flightSelector.onclick = flightSelection;
go.onchange = flightValidation;
back.onchange = flightValidation;
flightBook.onclick = bookFlight;

timeSet.onclick = resetTime;
timeRange.oninput = setTime;
timeView.onchange = displayTime;

function count() {
  let n = document.getElementById("counter-number");
  n.textContent = +n.textContent + 1 + "";
}

function tempconv(e) {
  if (e.target.id === "celcius") {
    farenheit.value = Math.round(e.target.value * (9 / 5) + 32);
  } else {
    celcius.value = Math.round((e.target.value - 32) * (5 / 9));
  }
}

function flightSelection(e) {
  if (e.target.value === "go") {
    back.disabled = true;
  } else {
    back.disabled = false;
  }
  flightValidation();
}

function flightValidation(e) {
  if (
    go.valueAsNumber > back.valueAsNumber &&
    flightSelector.value === "goback"
  ) {
    flightBook.disabled = true;
  } else {
    flightBook.disabled = false;
  }
}

function bookFlight(e) {
  if (flightSelector.value === "go") {
    alert(`You have booked a one-way flight for ${go.value}`);
  } else {
    alert(`You have booked a return flight from ${go.value} to ${back.value}`);
  }
}

setInterval(progressTime, 100);
var time = Date.now();
function resetTime() {
  time = Date.now();
}

function progressTime(){
  let diff = Date.now() - time;
  timeView.value = diff
  if(timeView.value < timeView.max){
    displayTime(diff);
  }
}

function setTime(){
  timeView.max = clamp(timeRange.value, timeView.value, 30000);
}

function displayTime(time){
  timeSpan.textContent = time / 1000 + "s";
}

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}
