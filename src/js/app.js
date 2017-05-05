'use strict';

/**
 * Is called from Button Click Event
 */
function clickButton() {
  this.classList.toggle('is-active');
}

document.getElementById('button').addEventListener('click', clickButton);
