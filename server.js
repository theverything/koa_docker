var koa = require('koa');
var body = require('co-body');
var router = require('koa-router');
var app = module.exports = koa();
var redis = require("redis");
var mongo = require('mongoose');
var parse = require('url').parse;
var redisURI = parse(process.env.REDIS_1_PORT);
var mongoURI = parse(process.env.MONGO_1_PORT);
var rc = redis.createClient(redisURI.port, redisURI.hostname);

// Mongo setup
mongo.connect("mongodb://" + mongoURI.hostname + ":" + mongoURI.port + "/webnode");
var mc = mongo.connection;
mc.on('error', console.error.bind(console, 'connection error: '));

// Posts Model setup
var Schema = mongo.Schema;
var postsSchema = new Schema({
  title: String,
  body: String
});
var Post = mongo.model('posts', postsSchema);

// Redis increment
var incr = function (key) {
  return function (cb) {
    rc.incr(key, cb);
  };
};

app.use(router(app));

app.get('/', function *(next) {
  var count = yield incr('counter');
  this.body = '<h1>This awesome page has been visited ' + count + ' times.</h1>';
});

app.get('/posts/new', function *() {
  this.body = "<form action='/posts' method='post'>" +
                "<label for='title'>Title</label><br />" +
                "<input type='text' id='title' name='title' placeholder='Hello World' /><br />" +
                "<label for='body'>Body</label><br />"+
                "<textarea name='body' id='body' placeholder='Write something here...' rows='10' cols='50'></textarea><br />" +
                "<input type='submit' />" +
               "</form>";
});

app.post('/posts', function *() {
  var postData = yield body(this);
  var post = yield Post.create(postData);

  this.redirect('/posts');
});

app.get('/posts', function *() {
  var posts = yield Post.find().exec();

  this.body = JSON.stringify(posts);
});
