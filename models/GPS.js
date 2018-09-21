const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GPSSchema = Schema({
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      default: 'Point',
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
})

module.exports = mongoose.model('GPS', GPSSchema)


