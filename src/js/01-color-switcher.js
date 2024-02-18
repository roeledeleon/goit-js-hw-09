// ---------- DECLARATIONS ----------
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

let bgColorChangeInterval = null;
let isBgColorChangeEnabled = false;

btnStart.removeAttribute('disabled');
btnStop.setAttribute('disabled', true);

// ---------- FUNCTIONS ----------

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const checkIsBgChangeColorEnabled = () => {
  if (isBgColorChangeEnabled) {
    // Start Interval
    bgColorChangeInterval = setInterval(() => {
      changeBgColor();
    }, 1000);
  } else {
    // Stop Interval
    clearInterval(bgColorChangeInterval);
  }
};

const changeBgColor = () => {
  document.body.style.backgroundColor = getRandomHexColor();
};

// ---------- EVENT LISTENERS ----------

btnStart.addEventListener('click', () => {
  isBgColorChangeEnabled = true;
  checkIsBgChangeColorEnabled();

  // START-STOP Button Settings
  btnStart.setAttribute('disabled', true);
  btnStop.removeAttribute('disabled');
});

btnStop.addEventListener('click', () => {
  isBgColorChangeEnabled = false;
  checkIsBgChangeColorEnabled();

  // START-STOP Button Settings
  btnStart.removeAttribute('disabled');
  btnStop.setAttribute('disabled', true);
});
