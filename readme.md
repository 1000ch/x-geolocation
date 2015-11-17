# [`<x-geolocation>`](http://1000ch.github.io/x-geolocation)

Geolocation API Wrapper Element.

## Install

Using [npm](https://www.npmjs.org/package/x-geolocation):

```sh
$ npm install x-geolocation
```

Using [bower](http://bower.io/search/?q=x-geolocation):

```sh
$ bower install x-geolocation
```

## Usage

Load `x-geolocation.js`.

```html
<link rel="import" href="x-geolocation.html">
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

MIT
