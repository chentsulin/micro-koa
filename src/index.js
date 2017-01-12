import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

module.exports = exports = serve;

function serve(fn) {
  const server = new Koa();

  server.use(bodyParser());

  server.use(fn);

  return server;
}


export const createError = (code, msg, orig) => {
  const err = new Error(msg);
  err.statusCode = code;
  err.originalError = orig;
  return err;
};
