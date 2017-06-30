"use strict";

/* global fetch */
/* global Headers */

// noinspection JSUnusedGlobalSymbols
/**
 * Initialize the Map, will called as callback after maps api is loaded
 */
function initMap() {
  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: {lat: 50.107667, lng: 8.665516}
  });

  let markers = locations.map(function(location) {
    return createMarker(location, map);
  });
}

/** *
 * @param {Object}location The Data to use for the Marker
 * @return {google.maps.Marker}
 * Initialize a Marker
 */
function createMarker(location, map) {
  let pos = new google.maps.LatLng(location.lat, location.lng);
  let flickrUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=bbfab672dac8055611f4a6406fe91d19&accuracy=16&accuracy=1&lat=${location.lat}&lon=${location.lng}&per_page=100&page=1&format=json&nojsoncallback=1`;

  let marker = new google.maps.Marker({
    position: pos,
    map: map,
    title: location.name
  });

  fetch(flickrUrl)
    .then(getStatus)
    .then(getJson)
    .then(data => createInfoText(data, location, marker))
    .catch(function(error) {
      console.log("Flickr Request Failed", error);
      createInfoText(null, location, marker);
    });

  return marker;
}

/** *
 * @param {object} response The Response of the Status check
 * @return {*}
 * Creates the Json from the Fetch Data
 */
function getJson(response) {
  return response.json();
}

/** *
 * @param {Object} response The Response from the Fetch Promise
 * @return {*}
 * Check the Status of the Fetch
 */
function getStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return Promise.reject(new Error(response.statusText));
}

/**
 * @param {Object} data Data from the Flickr Api
 * @param {Object} location Data of the Location for thee Info Window
 * @param {Object} marker The marker the InfoWindow will be for
 * Creates an InfoWindow for an Marker
 */
function createInfoText(data, location, marker) {
  let imageUrl = "";

  if (data !== null) {
    imageUrl = getFlickrImageUrl(data);
  }

  let infoContent = `<div class='InfoWindowContent'>
<h1>${location.name}</h1>
<p>${location.address}</p>
<figure>
<img src="${imageUrl}" alt="Some Picture from Flickr">
<figcaption>Not directly related but near here</figcaption>
</figure>
</div>`;

  marker.infoWindow = new google.maps.InfoWindow({content: infoContent});
  marker.infoWindow.isOpen = false;

  marker.addListener("click", function() {
    if (this.infoWindow.isOpen) {
      this.infoWindow.close();
      this.infoWindow.isOpen = false;
    } else {
      this.infoWindow.open(map, marker);
      this.infoWindow.isOpen = true;
    }
  });
}

/** *
 * @param {object} flickrImageResponse Object with different Photos to select from
 * @return {string} URL to the Image
 * Creates a URL to use from the Flickr Photo API Response
 */
function getFlickrImageUrl(flickrImageResponse) {
  var photo =
    flickrImageResponse.photos.photo[
      Math.floor(Math.random() * flickrImageResponse.photos.photo.length)
    ];

  return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
}
