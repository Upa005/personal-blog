'use strict';
let BaseController = require('./BaseController');

class PostsController extends BaseController {
  get(req, res, next) {
    let self = this;
    this.posts.find({})
      .sort({ createdAt: -1 })
      .skip(self.getSkip(req.query.page, req.query.per_page))
      .limit(self.getLimit(req.query.per_page))
      .exec((err, docs) => {
        docs = docs.map(function (doc) {
          doc.summary = self.filters.parseMarkdown(
            self.filters.getFirstWords(doc.content, 30)
          );
          return doc;
        });
        res.render('posts/index', { posts: docs, title: "All Posts" });
    });
  }
}

module.exports = PostsController;