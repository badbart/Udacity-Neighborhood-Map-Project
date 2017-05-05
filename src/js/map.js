'use strict';

// noinspection JSUnusedGlobalSymbols
/**
 * Initialize the Map, will called as callback after maps api is loaded
 */
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: {lat: 50.108680, lng: 8.663380}
  });
}
