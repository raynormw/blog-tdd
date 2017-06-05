require('dotenv').config();
const Users = require('../models/users_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let secret = process.env.SECRET_KEY;

function getUsers(req, res) {
  Users.find().populate('article_list')
  .exec(function(err, result) {
    if (err) {
      res.send(err.message);
    }
    console.log("Found the following records:");
    console.log(result);
    res.send(result);
  });
}


function getSingle(req, res) {
  Users.find({
    '_id': req.params.id
  }, function(err, result) {
    if (err) {
      res.send(err.message);
    }
    console.log("Found the following record:");
    console.log(result);
    res.send(result);
  });
}

function register(req, res) {
  let hash = bcrypt.hashSync(req.body.password, 8);

  Users.create({
    name:     req.body.name,
    username: req.body.username,
    password: hash,
    email:    req.body.email,
    role:     req.body.role || 'user',
    article_list:  req.body.article_list
  }, function(err, result) {
    if (err) {
      res.send(err.message);
    }
    console.log("Create:");
    console.log(result);
    res.send(result);
  });
}

function updateUser(req, res) {
  let hash;
  if (req.body.password) {
    hash = bcrypt.hashSync(req.body.password, 8);
  }

  Users.find({
    '_id' : req.params.id
  }, function(err, user) {
    if (!hash) {
      hash = user[0].password
    }
    console.log(user[0]);
    Users.update({
      '_id': user[0]._id
    }, {
      $set: {
        name:         req.body.name || user[0].name,
        username:     req.body.username || user[0].username,
        password:     hash,
        email:        req.body.email || user[0].email,
        role:         req.body.role || user[0].role,
        article_list: req.body.article_list || user[0].article_list
      }
    }, function(err, result) {
      if (err) res.send(err.message);
      res.send(result);
    });
  });
}

function deleteUser(req, res) {
  Users.remove({
    '_id': req.params.id
  }, function(err, result) {
    if (err) {
      res.send(err.message);
    }
    console.log("Delete:");
    console.log(result);
    res.send(result);
  });
}

function login(req, res) {
  Users.findOne({
    username : req.body.username
  }, function(err, user) {
    if (err) {
      res.send(err.message);
    }
    bcrypt.compare(req.body.password, user.password, function(err, result) {
      if (result) {
        let token = jwt.sign({role: user.role, id: user._id, username: user.username}, secret);
        res.send({token: token});
      } else {
        res.send("Wrong password..")
      }
    });
  });
}

module.exports = {
  getUsers, getSingle, register, updateUser, deleteUser, login
}
