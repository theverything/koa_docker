var koa = require('koa');
var router = require('koa-router');
var app = module.exports = koa();
var redis = require("redis");
var parse = require('url').parse;
var redisURI = parse(process.env.REDIS_1_PORT);
var client = redis.createClient(redisURI.port, redisURI.hostname);

var incr = function (key) {
  return function (cb) {
    client.incr(key, cb);
  };
};

app.use(router(app));

app.get('/', function *(next) {
  var count = yield incr('counter');
  this.body = 'This page has been visited ' + count + ' times.';
});

app.listen(8080);
