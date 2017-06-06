require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const Article = require('../server/models/articles_model');
const jwt = require('jsonwebtoken');
const server = 'http://localhost:3000';
let article_id = "";
let author_id = '5935b2e1bcc97713e44a16a7';
let secret = process.env.SECRET_KEY;

chai.use(chaiHttp)

describe('post new article', function () {
  it('should save article when calling with POST method',function (done) {
    chai.request(server)
    .post('/articles')
    .send({
      author: author_id,
      title : 'Hello World!',
      content : 'Lorem Ipsum Dolor Sit Amet',
      category : 'test',
      slug : 'hello-world'
    })
    .end(function (err,res) {
      res.body.msg.should.equal('Add article Success..');
      res.body.data.title.should.equal('Hello World!');
      res.body.data.content.should.equal('Lorem Ipsum Dolor Sit Amet');
      res.body.data.category.should.equal('test');
      res.body.data.slug.should.equal('hello-world');
      article_id = res.body.data._id;
      done()
    })
  })
})

describe('get all articles',function () {
  it('should get all articles when calling with GET method', function (done) {
    chai.request(server)
    .get('/articles')
    .end(function (err,res) {
      res.should.have.status(200);
      res.should.be.json;
      done()
    })
  })
})

describe('get article by author',function () {
  it('should get article by author when calling with GET method', function (done) {
    chai.request(server)
    .get('/articles/' + author_id)
    .end(function (err,res) {
      res.should.have.status(200);
      res.should.be.json;
      done()
    })
  })
})

describe('update article', function () {
  it('should update data and send msg if succeed', function (done) {
    chai.request(server)
    .put('/articles/' + article_id)
    .send({category: 'Learning'})
    .end(function (err,res) {
      res.should.have.status(200);
      res.body.msg.should.equal('Update success!')
      done()
    })
  })
})

describe('delete an article by id', function () {
  it('should delete an article by id with DELETE method', function (done) {
    chai.request(server)
    .delete('/articles/' + article_id)
    .end(function (err,res) {
      res.should.have.status(200);
      res.body.msg.should.equal('Delete success!')
      done()
    })
  })
})

describe('login succeed', function () {
  it('should get token if login is succeed', function (done) {
    chai.request(server)
    .post('/users/login')
    .send({
      username : 'admin',
      password : 'admin'
    })
    .end(function (err,res) {
      res.should.have.status(200)
      jwt.verify(res.body.token, secret).username.should.equal('admin')
      done()
    })
  })
})
