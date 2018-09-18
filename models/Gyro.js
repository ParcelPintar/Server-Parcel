const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gyroSchema = Schema({
  threshold = Number
})

module.exports = mongoose.model('ParcelPintar', gyroSchema)