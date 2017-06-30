"use strict";

/**
 * The ViewModel of this App
 * @constructor
 */
function AppViewModel() {
  let self = this;

  /**
   * The Markers for the Map
   * @type {KnockoutObservableArray<T>}
   */
  self.markers = ko.observableArray(locations);

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

  /**
   * Just an empty function, all it does is allowing to activate the clickBubble functionality
   */
  self.noClose = function() {};
}

// Activates Knockout with the given ViewModel
ko.applyBindings(new AppViewModel());
