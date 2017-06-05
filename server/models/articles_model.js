const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var articlesSchema = new Schema({
  author:  { type: Schema.Types.ObjectId, ref: 'users' },
  title : String,
  content : String,
  category : String,
  slug : String
});

var Articles = mongoose.model('articles', articlesSchema);

module.exports = Articles;
