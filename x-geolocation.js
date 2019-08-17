export default class XGeolocation extends HTMLElement {
  get latitude() {
    return this.getAttribute('latitude');
  }

  set latitude(value) {
    this.setAttribute('latitude', value);
  }

  get longitude() {
    return this.getAttribute('longitude');
  }

  set longitude(value) {
    this.setAttribute('longitude', value);
  }

  get monitor() {
    return this.hasAttribute('monitor');
  }

  set monitor(value) {
    this.setAttribute('monitor', value);
  }

  connectedCallback() {
    navigator.geolocation.getCurrentPosition(
      this.onPositionChangedCallback.bind(this),
      this.onPositionErrorCallback.bind(this)
    );

    if (this.monitor) {
      this.monitorPosition();
    }
  }

  disconnectedCallback() {
    this.stopMonitoring();
  }

  attributeChangedCallback(attributeName) {
    if (attributeName === 'monitor') {
      if (this.monitor) {
        this.monitorPosition();
      } else {
        this.stopMonitoring();
      }
    }
  }

  onPositionChangedCallback(position) {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;

    this.dispatchEvent(new CustomEvent('positionchange', {
      detail: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    }));
  }

  onPositionErrorCallback(positionError) {
    console.error(positionError);
  }

  monitorPosition() {
    if (!this.watchPositionId) {
      this.watchPositionId = navigator.geolocation.watchPosition(
        this.onPositionChangedCallback.bind(this),
        this.onPositionErrorCallback.bind(this)
      );
    }
  }

  stopMonitoring() {
    if (this.watchPositionId) {
      navigator.geolocation.clearWatch(this.watchPositionId);
    }
  }
}
