const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  receivers: [{ type: Schema.Types.ObjectId, ref: 'Order' }] 
})

module.exports = mongoose.model('User', userSchema)