const Articles = require('../models/articles_model');
const Users = require('../models/users_model');

function getAll(req, res) {
  Articles.find({}, function(err, result) {
    if (err) {
      res.send(err.message);
    }
    console.log("Found the following records:");
    console.log(result);
    res.send(result);
  });
}

function getSingle(req, res) {
  Articles.find({
    'author': req.params.id
  }, function(err, result) {
    if (err) {
      res.send(err.message);
    }
    console.log("Found the following records:");
    console.log(result);
    res.send(result);
  });
}

function createArticle(req, res) {
  Articles.create({
    author:  req.body.author,
    title : req.body.title,
    content : req.body.content,
    category : req.body.category,
    slug : req.body.slug,
  }, function(err, article) {
    if (err) {
      res.send(err.message);
    }
    Users.findById(req.body.author, function(err, user) {
      user.article_list.push(article._id);
      user.save(function(err) {
        if (err) res.send(err.message);
        res.send({msg: 'Add article Success..', user: user, data: article});
      });
    });
  });
}

function updateArticle(req, res) {
  Articles.find({
    '_id' : req.params.id
  }, function(err, user) {
    Articles.update({
      '_id': user[0]._id
    }, {
      $set: {
        author:     req.body.author || user[0].author,
        title :     req.body.title || user[0].title,
        content :   req.body.content || user[0].content,
        category :  req.body.category || user[0].category,
        slug :      req.body.slug || user[0].slug
      }
    }, function(err, result) {
      if (err) res.send(err.message);
      res.send({msg: 'Update success!', data: result});
    });
  });
}

function deleteArticle(req, res) {
  Articles.remove({
    '_id': req.params.id
  }, function(err, result) {
    if (err) {
      res.send(err.message);
    }
    res.send({msg: 'Delete success!', data: result});
  });
}

module.exports = {
  getAll, getSingle, createArticle, deleteArticle, updateArticle
}
