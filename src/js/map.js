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

  let infoWindow = new google.maps.InfoWindow();

  locations.map(function(location) {
    let marker = createMarker(location, map, infoWindow);
    location.marker = marker;
    return marker;
  });
}

/** *
 * @param {Object}location The Data to use for the Marker
 * @param {object} map The Map to use
 * @param {object} infoWindow The global InfoWindow to reuse
 * @return {google.maps.Marker}
 * Initialize a Marker
 */
function createMarker(location, map, infoWindow) {
  let pos = new google.maps.LatLng(location.lat, location.lng);

  let marker = new google.maps.Marker({
    position: pos,
    map: map,
    title: location.name
  });

  createInfoWindow(location, marker, map, infoWindow);

  return marker;
}

/**
 * @param {object} location The Location to create the InfoWindow for
 * @param {object} marker The Marker to link to Window to
 * @param {object} map The Map use
 * @param {object} infoWindow The global InfoWindow to reuse
 * Creates an Info Window of an Location for a Marker
 */
function createInfoWindow(location, marker, map, infoWindow) {
  let flickrUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3a35228f06f31f952ec5e63a9f0f0f9f&accuracy=16&accuracy=1&lat=${location.lat}&lon=${location.lng}&per_page=100&page=1&format=json&nojsoncallback=1`;

  fetch(flickrUrl)
    .then(getStatus)
    .then(getJson)
    .then(data => createInfoText(data, location, marker, map, infoWindow))
    .catch(function(error) {
      console.log("Flickr Request Failed", error);
      createInfoText(null, location, marker, map, infoWindow);
    });
}

/**
 * @param {Object} data Data from the Flickr Api
 * @param {Object} location Data of the Location for thee Info Window
 * @param {Object} marker The marker the InfoWindow will be for
 * @param {object} map The Map use
 * @param {object} infoWindow The global InfoWindow to reuse
 * Creates an InfoWindow for an Marker
 */
function createInfoText(data, location, marker, map, infoWindow) {
  let imageUrl = "";
  let infoContent = "";

  if (data === null) {
    infoContent = `<div class='InfoWindowContent'>
<h1>${location.name}</h1>
<p>${location.address}</p>
<p>There was a Problem loading the Image from Flickr, sorry</p>
</div>`;
  } else {
    imageUrl = getFlickrImageUrl(data);

    infoContent = `<div class='InfoWindowContent'>
<h1>${location.name}</h1>
<p>${location.address}</p>
<figure>
<img src="${imageUrl}" alt="Some Picture from Flickr">
<figcaption>Not directly related but near here, from Flickr</figcaption>
</figure>
</div>`;
  }

  marker.addListener("click", function() {
    startBounce(this);
    infoWindow.setContent(infoContent);
    infoWindow.open(map, this);
  });
}

/** *
 * @param {object} flickrImageResponse Object with different Photos to select from
 * @return {string} URL to the Image
 * Creates a URL to use from the Flickr Photo API Response
 */
function getFlickrImageUrl(flickrImageResponse) {
  let photo =
    flickrImageResponse.photos.photo[
      Math.floor(Math.random() * flickrImageResponse.photos.photo.length)
    ];

  return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
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
 * @param {object} changedLocation The Changed Location
 * Hides a Marker on the Map
 */
function hideMarker(changedLocation) {
  if (changedLocation.marker) {
    changedLocation.marker.setVisible(false);
  }
}

/**
 * @param {object} changedLocation The Changed Location
 * Shows a Marker on the Map
 */
function showMarker(changedLocation) {
  if (changedLocation.marker) {
    changedLocation.marker.setVisible(true);
  }
}

/**
 * @param {object} marker The Marker to bounce
 * Bounce a Marker once
 */
function startBounce(marker) {
  marker.setAnimation(google.maps.Animation.BOUNCE);
  setTimeout(function() {
    marker.setAnimation(null);
  }, 710);
}

/**
 * @param {object} marker The Marker of which the Info Window should be shown
 * Opens the Info Window of the given Marker
 */
function openInfoWindowOfMarker(marker) {
  google.maps.event.trigger(marker, "click");
}
