import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const dateInput = document.querySelector("#datetime-picker")
const startBtn = document.querySelector("[data-start]")

const daysEl =document.querySelector("[data-days]")
const hoursEl =document.querySelector("[data-hours]")
const minEl = document.querySelector("[data-minutes]")
const secEl = document.querySelector("[data-seconds]")
    
let userSelectedDate = null
let timerId = null
startBtn.disabled = true

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const date = new Date()
        if (selectedDates[0] < date) {
           iziToast.error({
  title: 'Invalid date',
  message: 'Please choose a date in the future',
  position: 'topRight',
});

            startBtn.disabled = true
        }
        else {
            userSelectedDate = selectedDates[0]   
            startBtn.disabled = false
    }
  },
};
flatpickr("#datetime-picker", options);

startBtn.addEventListener("click", onDateClick);

function onDateClick(){
    timerId = setInterval(() => {
     startBtn.disabled = true
    dateInput.disabled = true
    const now = new Date()
        const timeLeft = userSelectedDate - now 
    
        if (timeLeft <= 0) {
            clearInterval(timerId)

            daysEl.textContent = '00'
            hoursEl.textContent = '00'
            minEl.textContent = '00'
            secEl.textContent = '00'

            dateInput.disabled = false
            return
        }
const { days, hours, minutes, seconds } = convertMs(timeLeft);

    daysEl.textContent = days;
    hoursEl.textContent = addLeadingZero(hours);
    minEl.textContent = addLeadingZero(minutes);
    secEl.textContent = addLeadingZero(seconds);

   }, 1000)
    
}

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


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}