const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: String,
  description: String,
  discountPercent: Number,
  validUntil: Date,
  active: { type: Boolean, default: true },
  image: String,
  link: String
});

module.exports = mongoose.model('Offer', offerSchema);