import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

module.exports = exports = serve;

exports.send = send;
exports.createError = createError;


function serve(fn) {
  const server = new Koa();

  server.use(bodyParser());

  server.use(fn);

  return server;
}


function send(response, code, data) {
  response.status = code;
  response.body = data;
}


function createError(code, msg, orig) {
  const err = new Error(msg);
  err.statusCode = code;
  err.originalError = orig;
  return err;
};
