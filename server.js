var koa = require('koa');
var http = require('http');

var app = koa();

app.use(function *() {
  this.body = "Hello World!";
});

var app = module.exports = http.createServer(app.callback());
app.listen(8080);
