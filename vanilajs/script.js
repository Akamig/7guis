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
let crudList = document.getElementById("crud-list");
let crudFilter = document.getElementById("crud-filter");
let crudName = document.getElementById("crud-name");
let crudSurname = document.getElementById("crud-surname");
let crudCreate = document.getElementById("crud-create");
let crudUpdate = document.getElementById("crud-update");
let crudDelete = document.getElementById("crud-delete");

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

crudCreate.onclick = create;
crudUpdate.onclick = update;
crudDelete.onclick = remove;
crudFilter.oninput = filter;

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

function progressTime() {
  let diff = Date.now() - time;
  timeView.value = diff;
  if (timeView.value < timeView.max) {
    displayTime(diff);
  }
}

function setTime() {
  timeView.max = clamp(timeRange.value, timeView.value, 30000);
}

function displayTime(time) {
  timeSpan.textContent = time / 1000 + "s";
}

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

function filterInput(name, surname) {
  if (name !== "" && surname !== "") {
    return true;
  } else {
    return false;
  }
}

function newEntry() {
  if (filterInput(crudName.value, crudSurname.value)) {
    let newEntry = document.createElement("option");
    newEntry.text = crudName.value + ", " + crudSurname.value;
    return newEntry;
  }
}

function create() {
  crudList.add(newEntry());
}

function update() {
  let selectedEntry = crudList.selectedOptions;
  selectedEntry[0].innerHTML = newEntry().innerHTML;
}

function remove() {
  crudList.remove(crudList.selectedIndex);
}

function filter() {
  let a = crudList.options;
  if (crudFilter.value === "") {
    for (let i = 0; i < a.length; i++) {
      a[i].hidden = false;
    }
  } else {
    for (let i = 0; i < a.length; i++) {
      if (a[i].textContent.includes(crudFilter.value)) {
        a[i].hidden = false;
      } else {
        a[i].hidden = true;
      }
    }
  }
}

