const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parcelPintarSchema = Schema({
  gyro: { 
    type: Schema.Types.ObjectId, ref: 'Gyro',
    required: true
  },
  gps: { 
    type: Schema.Types.ObjectId, ref: 'GPS',
    required: true 
  }
})

module.exports = mongoose.model('ParcelPintar', parcelPintarSchema)