const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GPSSchema = Schema({
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
})

module.exports = mongoose.model('ParcelPintar', GPSSchema)

// let GPS = new GPS({ 
//   "loc": { 
//       "type": "Point",
//       "coordinates": [-73.97, 40.77]
//   }
// });

