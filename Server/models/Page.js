const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, required: true, unique: true },
  content: String, // HTML or markdown
  heroTitle: String,
  heroSubtitle: String,
  seo: {
    metaTitle: String,
    metaDescription: String
  },
  published: { type: Boolean, default: true }
});

module.exports = mongoose.model('Page', pageSchema);