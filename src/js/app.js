'use strict';

var button = document.getElementById('button');
var closeModal = document.getElementById('closeModal');
var modal = document.getElementById('filterModal');

/**
 * Is called from Button Click Event
 */
function clickButton() {
  modal.style.display = 'block';
  button.classList.toggle('is-active');
}

function clickCloseModal() {
  modal.style.display = 'none';
  button.classList.toggle('is-active');
}

button.addEventListener('click', clickButton);
closeModal.addEventListener('click', clickCloseModal);
