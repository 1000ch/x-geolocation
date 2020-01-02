# `<x-geolocation>`

> Declarative Geolocation API as Web Components.

[![Build Status](https://travis-ci.org/1000ch/x-geolocation.svg?branch=master)](https://travis-ci.org/1000ch/x-geolocation)
[![NPM version](https://badge.fury.io/js/x-geolocation.svg)](http://badge.fury.io/js/x-geolocation)
[![devDependency Status](https://david-dm.org/1000ch/x-geolocation/dev-status.svg)](https://david-dm.org/1000ch/x-geolocation?type=dev)

## Install

Using [npm](https://www.npmjs.org/package/x-geolocation):

```sh
$ npm install x-geolocation
```

## Usage

Import `XGeolocation` and register it.

```html
<script type="module">
import XGeolocation from 'https://cdn.jsdelivr.net/npm/x-geolocation/dist/index.js';
customElements.define('x-geolocation', XGeolocation);
</script>
```

Put `<x-geolocation>` tag.

```html
<x-geolocation></x-geolocation>
```

### Monitoring position change

To monitor position changing, execute `monitorPosition()` function.

```js
document.querySelector('x-geolocation').monitorPosition();
```

Or set `monitor` attribute.

```html
<x-geolocation monitor></x-geolocation>
```

### Handle position changes

Handle `positionchange` event using `addEventListener()`.

```js
document.querySelector('x-geolocation').addEventListener('positionchange', e => {
  console.log('latitude:', e.detail.latitude);
  console.log('longitude:', e.detail.longitude)
});
```

## License

[MIT](https://1000ch.mit-license.org) © [Shogo Sensui](https://github.com/1000ch)
