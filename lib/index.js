'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createError = undefined;

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports = serve;

function serve(fn) {
  var server = new _koa2.default();

  server.use((0, _koaBodyparser2.default)());

  server.use(fn);

  return server;
}

var createError = exports.createError = function createError(code, msg, orig) {
  var err = new Error(msg);
  err.statusCode = code;
  err.originalError = orig;
  return err;
};