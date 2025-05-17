import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector(".form")
const inputEl = document.querySelector('input[name="delay"]')


formEl.addEventListener('submit', onBtnSubmit)

function onBtnSubmit(e) {
    e.preventDefault()
const delay = Number(inputEl.value)
    const state = document.querySelector('input[name="state"]:checked').value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay)
            } else {
                reject(delay)
            }
        }, delay)
    })
     promise
    .then((resolvedDelay) => {
      iziToast.success({
        title: '✅ Fulfilled',
        message: `Fulfilled promise in ${resolvedDelay}ms`,
      });
    })
    .catch((rejectedDelay) => {
      iziToast.error({
        title: '❌ Rejected',
        message: `Rejected promise in ${rejectedDelay}ms`,
      });
    });
}