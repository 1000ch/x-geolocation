if (!document.registerElement) {
  throw new Error('Browser does not support document.registerElement');
}

window.XGeolocation = (function () {
  'use strict';

  var XGeolocationPrototype = Object.create(HTMLElement.prototype);

  Object.defineProperty(XGeolocationPrototype, 'latitude', {
    configurable: false,
    enumerable: false,
    get: function () {
      return this.getAttribute('latitude');
    }
  });

  Object.defineProperty(XGeolocationPrototype, 'longitude', {
    configurable: false,
    enumerable: false,
    get: function () {
      return this.getAttribute('longitude');
    }
  });

  XGeolocationPrototype.onPositionChangedCallback = function (position) {
    this.setAttribute('latitude', position.coords.latitude);
    this.setAttribute('longitude', position.coords.longitude);
  };

  XGeolocationPrototype.onPositionErrorCallback = function (positionError) {

  };

  XGeolocationPrototype.createdCallback = function () {};

  XGeolocationPrototype.attachedCallback = function () {
    navigator.geolocation.getCurrentPosition(
      this.onPositionChangedCallback.bind(this),
      this.onPositionErrorCallback.bind(this)
    );
  };

  XGeolocationPrototype.watchPosition = function () {
    this.watchPositionId = navigator.geolocation.watchPosition(
      this.onPositionChangedCallback.bind(this),
      this.onPositionErrorCallback.bind(this)
    );
  };

  XGeolocationPrototype.detachedCallback = function () {};

  XGeolocationPrototype.attributeChangedCallback = function () {};

  return document.registerElement('x-geolocation', {
    prototype: XGeolocationPrototype
  });
})();
