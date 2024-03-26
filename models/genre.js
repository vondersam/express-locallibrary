const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 300 }
});

// Virtual for Genre's URL
GenreSchema.virtual('url').get(function () {
  // We don't use an arrow function as we'll beed the this object
  return `/catalog/genre/${this._id}`;
});

// Export model
module.exports = mongoose.model('Genre', GenreSchema);
