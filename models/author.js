const mongoose = require('mongoose');
const { DateTime } = require('luxon');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date }
});

// Virtual for author's full name
AuthorSchema.virtual('name').get(function () {
  // To aoid errors in case where an author does not have either a family name
  // or first name, we want to make sure we handle the exception by returning an
  // empty string for that case
  let fullname = '';
  if (this.first_name && this.family_name) {
    fullname = `${this.first_name} ${this.family_name}`;
  }
  return fullname;
});

// Virtual for author's URL
AuthorSchema.virtual('url').get(function () {
  // We dont use an arrow function as we'll need the this object
  return `/catalog/author/${this._id}`;
});

// Virtual for author's date of birth
AuthorSchema.virtual('date_of_birth_formatted').get(function () {
  if (this.date_of_birth) {
    return DateTime.fromJSDate(this.date_of_birth).toLocaleString(
      DateTime.DATE_MED
    );
  }
  return '';
});

// Virtual for author's date of death
AuthorSchema.virtual('date_of_death_formatted').get(function () {
  if (this.date_of_death) {
    return DateTime.fromJSDate(this.date_of_death).toLocaleString(
      DateTime.DATE_MED
    );
  }
  return '';
});

// Virtual for author's date of death
AuthorSchema.virtual('lifespan').get(function () {
  return `${this.date_of_birth_formatted} - ${this.date_of_death_formatted}`;
});

// Export model
module.exports = mongoose.model('Author', AuthorSchema);
