# [`<x-geolocation>`](http://1000ch.github.io/x-geolocation)

## About

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
<script src="x-geolocation.js"></script>
```

After loading, put `<x-geolocation>` tag.

```html
<x-geolocation></x-geolocation>
```

To monitor position changing, execute `watchPosition()` function.

```js
document.querySelector('x-geolocation').watchPosition();
```

## License

MIT