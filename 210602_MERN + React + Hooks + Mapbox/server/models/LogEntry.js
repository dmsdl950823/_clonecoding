const mongoose = require('mongoose');

const { Schema } = mongoose;

// * Title - Text
// * Description - Text
// * Comments - Text
// * Rating - scale of 1 - 10
// * Image - Text - URL
// * Latitude - Number
// * Longitude - Number
// * Created At - DateTime
// * Updated At - DateTime

const requiredNumber = {
  type: Number,
  required: true,
};

// define schema
const logEntrySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  Descript: String,
  body: String,
  comments: String,
  image: String,
  rating: {
    type: Number,
    min: 1,
    max: 10,
    default: 0,
  },
  latitude: {
    ...requiredNumber,
    min: -90,
    max: 90,
  },
  longtitude: {
    ...requiredNumber,
    min: -180,
    max: 180,
  },
  visitDate: {
    required: true,
    type: Date,
  },
}, {
  // options
  timestamps: true,
});

const LogEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = LogEntry;
