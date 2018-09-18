const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gyroSchema = Schema({
  threshold = { 
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('ParcelPintar', gyroSchema)