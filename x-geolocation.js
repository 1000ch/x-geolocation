window.XGeolocation = (function () {
  'use strict';

  var XGeolocationPrototype = Object.create(HTMLElement.prototype);

  Object.defineProperty(XGeolocationPrototype, 'latitude', {
    configurable: false,
    enumerable: true,
    get: function () {
      return this.getAttribute('latitude');
    },
    set: function (newValue) {
      this.setAttribute('latitude', newValue);
    }
  });

  Object.defineProperty(XGeolocationPrototype, 'longitude', {
    configurable: false,
    enumerable: true,
    get: function () {
      return this.getAttribute('longitude');
    },
    set: function (newValue) {
      this.setAttribute('longitude', newValue);
    }
  });

  Object.defineProperty(XGeolocationPrototype, 'monitor', {
    configurable: false,
    enumerable: true,
    get: function () {
      return this.hasAttribute('monitor');
    },
    set: function (newValue) {
      this.setAttribute('monitor', newValue);
    }
  });

  XGeolocationPrototype.onPositionChangedCallback = function (position) {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;

    var event = new CustomEvent('positionchange', {
      detail: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    });
    this.dispatchEvent(event);
  };

  XGeolocationPrototype.onPositionErrorCallback = function (positionError) {};

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
