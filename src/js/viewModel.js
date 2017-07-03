"use strict";

/**
 * The ViewModel of this App
 * @constructor
 */
function AppViewModel() {
  let self = this;

  /**
   * @type {KnockoutObservable<T>} The query string the user is typing in the search box
   */
  self.query = ko.observable("");

  // noinspection JSValidateJSDoc
  /**
   * @type {KnockoutDependentObservable<T>} The Locations to show on the Map, using query for a Filter
   */
  self.locations = ko.dependentObservable(function() {
    let search = self.query().toLowerCase();
    return ko.utils.arrayFilter(locations, function(location) {
      if (location.name.toLowerCase().indexOf(search) >= 0) {
        showMarker(location);
        return true;
      }
      hideMarker(location);
      return false;
    });
  }, this);

  /**
   * Is the Modal Active at the Moment
   * @type {KnockoutObservable<T>}
   */
  self.modalActive = ko.observable(false);

  /**
   * Activates the Modal
   */
  self.activateModal = function() {
    self.modalActive(true);
  };

  /**
   * Deactivate the Modal
   */
  self.deactivateModal = function() {
    self.modalActive(false);
  };

  /**   *
   * @param {object} item The Location Object of the clicked Item
   * Invokes the Actions necessary to show the InfoWindow of the clicked Item
   */
  self.showInfo = function(item) {
    openInfoWindowOfMarker(item.marker);
    self.deactivateModal();
  };

  /**
   * Just an empty function, all it does is allowing to activate the clickBubble functionality
   */
  self.noClose = function() {};
}

// Activates Knockout with the given ViewModel
ko.applyBindings(new AppViewModel());
