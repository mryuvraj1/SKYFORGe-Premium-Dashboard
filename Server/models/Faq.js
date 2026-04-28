const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String,
  order: Number
});

module.exports = mongoose.model('Faq', faqSchema);