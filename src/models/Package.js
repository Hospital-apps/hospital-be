const mongoose = require('mongoose');
const { Schema } = mongoose;

const packageShema = new Schema({
  name: { type: String, required: true },
  img: { type: String, required: true }
});

const Package = mongoose.model('Package', packageShema);
module.exports = Package;
