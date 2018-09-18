const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GPSSchema = Schema({
  location: {
    type: { type: String },
    coordinates: []
  }
})

module.exports = mongoose.model('ParcelPintar', GPSSchema)

// let GPS = new GPS({ 
//   "loc": { 
//       "type": "Point",
//       "coordinates": [-73.97, 40.77]
//   }
// });

