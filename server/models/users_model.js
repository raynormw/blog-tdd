const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var usersSchema = new Schema({
  name:     String,
  username: String,
  password: String,
  email:    String,
  role:     String,
  article_list:  [{ type: Schema.Types.ObjectId, ref: 'articles' }]
});

var Users = mongoose.model('users', usersSchema);

module.exports = Users;
