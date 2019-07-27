var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BusinessSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  date: {
      type: Date,
      required: true
  },
  saved: {
      type: Boolean,
      default: false
  },

  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

var Business = mongoose.model("Business", BusinessSchema);

module.exports = Business;
