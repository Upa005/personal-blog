'use strict';
let router = require('express').Router();
let JsonController = require('../controllers/JsonController');
let PostController = require('../controllers/PostController');
let PostEditController = require('../controllers/PostEditController');
let PostsController = require('../controllers/PostsController');
let RssController = require('../controllers/RssController');
let SearchController = require('../controllers/SearchController');
let TagController = require('../controllers/TagController');
let TypeController = require('../controllers/TypeController');
let Setting = require('../models/Setting');
let auth = require('http-auth');

let basic = auth.basic({
    realm: "Admin Area."
  }, (username, password, callback) => {
    Setting.findOne({"_id": "credentials"}).then((credentials) => {
      callback(credentials.value.username === username && credentials.value.password === password);
    }, (error) => {
      callback(error);
    });
  }
);

/* GET home page. */
router.get('/', function(req, res, next) {
  (new PostsController).get(req, res, next);
});
/* GET search page. */
router.get('/search', function(req, res, next) {
  (new SearchController).get(req, res, next);
});
/* GET add single post page. */
router.get('/posts/add', auth.connect(basic), function(req, res, next) {
  (new PostEditController).get(req, res, next);
});
/* POST add single post. */
router.post('/posts/add', auth.connect(basic), function(req, res, next) {
  (new PostEditController).postAdd(req, res, next);
});
/* GET single post page. */
router.get('/posts/:id', function(req, res, next) {
  (new PostController).get(req, res, next);
});
/* GET edit single post page. */
router.get('/posts/:id/edit', auth.connect(basic), function(req, res, next) {
  (new PostEditController).get(req, res, next);
});
/* POST edit single post. */
router.post('/posts/:id/edit', auth.connect(basic), function(req, res, next) {
  (new PostEditController).postEdit(req, res, next);
});
/* GET posts by type. */
router.get('/types/:type', function(req, res, next) {
  (new TypeController).get(req, res, next);
});
/* GET posts by tag. */
router.get('/tags/:tag', function(req, res, next) {
  (new TagController).get(req, res, next);
});
/* GET rss feed of posts. */
router.get('/rss', function(req, res, next) {
  (new RssController).get(req, res, next);
});
/* GET all posts as json */
router.get('/json', auth.connect(basic), function(req, res, next) {
  (new JsonController).get(req, res, next);
});
/* GET robots.txt file */
router.get('/robots.txt', function (req, res) {
  res.type('text/plain');
  res.send("User-agent: *\nDisallow:\nAllow: /");
});

module.exports = router;
