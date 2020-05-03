export default class XGeolocation extends HTMLElement {
  watchPositionId?: number = undefined;

  get latitude(): number | undefined {
    if (this.hasAttribute('latitude')) {
      return Number(this.getAttribute('latitude'));
    }

    return undefined;
  }

  set latitude(value: number | undefined) {
    if (value === null || value === undefined) {
      this.removeAttribute('latitude');
    } else {
      this.setAttribute('latitude', String(value));
    }
  }

  get longitude(): number | undefined {
    if (this.hasAttribute('longitude')) {
      return Number(this.getAttribute('longitude'));
    }

    return undefined;
  }

  set longitude(value: number | undefined) {
    if (value === null || value === undefined) {
      this.removeAttribute('longitude');
    } else {
      this.setAttribute('longitude', String(value));
    }
  }

  get monitor(): boolean | undefined {
    return this.hasAttribute('monitor');
  }

  set monitor(value: boolean | undefined) {
    if (value === null || value === undefined || !value) {
      this.removeAttribute('monitor');
    } else {
      this.setAttribute('monitor', String(value));
    }
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

  attributeChangedCallback(attributeName: string) {
    if (attributeName === 'monitor') {
      if (this.monitor) {
        this.monitorPosition();
      } else {
        this.stopMonitoring();
      }
    }
  }

  onPositionChangedCallback(position: Position) {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;

    const event = new CustomEvent('positionchange', {
      detail: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    });
    this.dispatchEvent(event);
  }

  onPositionErrorCallback(positionError: PositionError) {
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
