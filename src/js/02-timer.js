// ---------- IMPORTS

import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// ---------- Additional styles import

import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.2.7.min.css';

// ---------- DECLARATIONS

const dateTimePicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const timer = {
  daysField: document.querySelector('[data-days]'),
  hoursField: document.querySelector('[data-hours]'),
  minutesField: document.querySelector('[data-minutes]'),
  secondsField: document.querySelector('[data-seconds]'),
};

let targetDate = null;
let isBtnStartClicked = false;
let targetTime = null;

btnStart.disabled = true; // Disable the Start Button

const optionsFlatPicker = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    targetDate = selectedDates[0].getTime();

    if (targetDate <= Date.now()) {
      btnStart.disabled = true;
      //window.alert('Please choose a date in the future');
      Notify.failure('Please choose a date in the future');
      return;
    }

    isBtnStartClicked = false;
    btnStart.disabled = false; // Enable the Start Button
  },
};

const optionsNotify = {
  position: 'center-right',
  timeout: 2000,
  clickToClose: true,
};

// ---------- INITIALIZATIONS

flatpickr(dateTimePicker, optionsFlatPicker);
Notify.init(optionsNotify);

// ---------- FUNCTIONS

const checkIsBtnStartClicked = () => {
  if (isBtnStartClicked) {
    //Start CountDown
    const timerId = setInterval(() => {
      targetTime = targetDate - Date.now();
      if (targetTime > 0) {
        onTimeUpdate(targetTime);
      } else {
        // Stop CountDown
        clearInterval(timerId);
        onTimeStop();
      }
    }, 1000);
  }
};

const onTimeUpdate = time => {
  updateTimer(time, timer);
};

const onTimeStop = () => {
  isBtnStartClicked = false;
  dateTimePicker.disabled = false; // Enable the Date/Time Picker
  btnStart.disabled = true; // Disable the Start Button
};

const updateTimer = (time, timerElements) => {
  const { daysField, hoursField, minutesField, secondsField } = timerElements;
  const { days, hours, minutes, seconds } = convertMs(time);

  daysField.textContent = addLeadingZero(days);
  hoursField.textContent = addLeadingZero(hours);
  minutesField.textContent = addLeadingZero(minutes);
  secondsField.textContent = addLeadingZero(seconds);
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => {
  return value.toString().padStart(2, '0');
};

// ---------- EVENT LISTENERS

btnStart.addEventListener('click', () => {
  isBtnStartClicked = true;

  checkIsBtnStartClicked();

  dateTimePicker.disabled = true; // Disable Date/Time Picker
  btnStart.disabled = true; // Disable Start Button
});
