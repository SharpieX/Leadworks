'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var BookSchema = new Schema ({
  title : { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: { type: String}
});

//BookSchema.index({ title: 'text', author: 'text', description: 'text', isbn: 'text', genre:'text'});

module.exports = mongoose.model('Book', BookSchema);
