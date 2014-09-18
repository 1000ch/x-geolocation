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

  Object.defineProperty(XGeolocationPrototype, 'monitor', {
    configurable: false,
    enumerable: false,
    get: function () {
      return this.hasAttribute('monitor');
    },
    set: function (newValue) {
      this.setAttribute('monitor', newValue);
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

    if (this.monitor) {
      this.monitorPosition();
    }
  };

  XGeolocationPrototype.monitorPosition = function () {
    if (!this.watchPositionId) {
      this.watchPositionId = navigator.geolocation.watchPosition(
        this.onPositionChangedCallback.bind(this),
        this.onPositionErrorCallback.bind(this)
      );
    }
  };

  XGeolocationPrototype.stopMonitoring = function () {
    if (this.watchPositionId) {
      navigator.geolocation.clearWatch(this.watchPositionId);
    }
  };

  XGeolocationPrototype.detachedCallback = function () {
    this.stopMonitoring();
  };

  XGeolocationPrototype.attributeChangedCallback = function (attributeName, oldValue, newValue) {
    if (attributeName === 'monitor') {
      if (this.monitor) {
        this.monitorPosition();
      } else {
        this.stopMonitoring();
      }
    }
  };

  return document.registerElement('x-geolocation', {
    prototype: XGeolocationPrototype
  });
})();
