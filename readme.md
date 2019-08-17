# `<x-geolocation>`

Geolocation API Wrapper Element.

## Install

Using [npm](https://www.npmjs.org/package/x-geolocation):

```sh
$ npm install x-geolocation
```

## Usage

Import `x-geolocation.js` and register.

```html
<script type="module">
  import XNotification from './x-notification.js';
  customElements.define('x-notification', XNotification);
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
document.querySelector('x-geolocation').addEventListener('positionchange', function (e) {
  console.log('latitude:', e.detail.latitude);
  console.log('longitude:', e.detail.longitude)
});
```

## License

[MIT](https://1000ch.mit-license.org) © [Shogo Sensui](https://github.com/1000ch)
