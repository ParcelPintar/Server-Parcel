const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parcelPintarSchema = Schema({
  gyro: { type: Schema.Types.ObjectId, ref: 'Gyro' },
  gps: { type: Schema.Types.ObjectId, ref: 'GPS' }
})

module.exports = mongoose.model('ParcelPintar', parcelPintarSchema)