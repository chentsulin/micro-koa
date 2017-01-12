# micro-koa

[![NPM version][npm-image]][npm-url]

> Creating microservices with koa inspired by zeit/micro

## Example

The following example `sleep.js` will wait before responding (without blocking!)

```js
const { send } = require('micro-koa');
const sleep = require('then-sleep');

module.exports = async function ({ request, response }) {
  await sleep(500);
  send(res, 200, 'Ready!');
};
```

To run the microservice on port `3000`, use the `micro-koa` command:

```bash
micro-koa sleep.js
```

To run the microservice on port `3000` and localhost instead of listening on every interface, use the `micro-koa` command:

```bash
micro-koa -H localhost sleep.js
```

## Usage

Install the package (requires at least Node v4):

```js
npm install --save micro-koa
```

And start using it in your `package.json` file:

```js
"main": "index.js",
"scripts": {
  "start": "micro-koa"
}
```

Then write your `index.js` (see above for an example).

After that, you can make the server run by executing the following command:

```bash
npm start
```


### API

#### micro

**`micro(fn)`**

- This function is exposed as the `default` export.
- Use `require('micro-koa')`.
- Returns a [`http.Server`](https://nodejs.org/dist/latest-v4.x/docs/api/http.html#http_class_http_server) created by `koa` that uses the provided `fn` as the last middleware.
- The supplied function is run with `await`. It can be `async`!
- Example:

  ```js
  const micro = require('micro-koa');
  const sleep = require('then-sleep');
  const srv = micro(async function ({ request, response }) {
    await sleep(500);
    response.status = 200;
    response.body = 'woot';
  });
  srv.listen(3000);
  ```

#### send

**`send(res, statusCode, data = null)`**

- Use `require('micro-koa').send`.
- `statusCode` is a `Number` with the HTTP error code, and must always be supplied.
- If `data` is supplied it is sent in the response. Different input types are processed appropriately, and `Content-Type` and `Content-Length` are automatically set.
  - `Stream`: `data` is piped as an `octet-stream`. Note: it is _your_ responsibility to handle the `error` event in this case (usually, simply logging the error and aborting the response is enough).
  - `Buffer`: `data` is written as an `octet-stream`.
  - `object`: `data` is serialized as JSON.
  - `string`: `data` is written as-is.
- Example

  ```js
  const { send } = require('micro-koa')
  module.exports = async function ({ request, response }) {
    send(response, 400, { error: 'Please use a valid email' });
  }
  ```
  
#### createError

**`createError(code, msg, orig)`**

- Use `require('micro').createError`.
- Creates an error object with a `statusCode`.
- Useful for easily throwing errors with HTTP status codes, which are interpreted by the [built-in error handling](#error-handling).
- `orig` sets `error.originalError` which identifies the original error (if any).


### Deployment

You can use the `micro-koa` CLI for `npm start`:

```json
{
  "name": "my-microservice",
  "dependencies": {
    "micro-koa": "x.y.z"
  },
  "main": "microservice.js",
  "scripts": {
    "start": "micro-koa -p 3000"
  }
}
```

Then simply run `npm start`!

## Credits

This package couldn't exist without the awesome [micro](https://github.com/zeit/micro) and [koa](https://github.com/koajs/koa) packages!

## License

MIT © [C.T. Lin](https://github.com/chentsulin/micro-koa)

[npm-image]: https://badge.fury.io/js/micro-koa.svg
[npm-url]: https://npmjs.org/package/micro-koa
