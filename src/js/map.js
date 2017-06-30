"use strict";

// noinspection JSUnusedGlobalSymbols
/**
 * Initialize the Map, will called as callback after maps api is loaded
 */
function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: {lat: 50.107667, lng: 8.665516}
  });

  var markers = locations.map(function(location) {
    var pos = new google.maps.LatLng(location.lat, location.lng);

    var infoContent =
      "<div class='InfoWindowContent'><h1>" + location.name + "</h1></div>";

    var marker = new google.maps.Marker({
      position: pos,
      map: map,
      title: location.name
    });

    marker.infoWindow = new google.maps.InfoWindow({content: infoContent});

    marker.addListener("click", function() {
      this.infoWindow.open(map, marker);
    });

    return marker;
  });
}
