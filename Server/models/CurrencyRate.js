const mongoose = require('mongoose');

const currencyRateSchema = new mongoose.Schema({
  base: { type: String, default: 'INR' },
  rates: { type: Object, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CurrencyRate', currencyRateSchema);