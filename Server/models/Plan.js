const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', default: null },
  price: { type: Number, required: true }, // base price in INR
  discountPrice: { type: Number, default: 0 },
  ram: String,
  cpu: String,
  storage: String,
  backups: String,
  databases: String,
  features: [String],
  badge: String, // "popular", "limited", etc.
  icon: String,
  stock: { type: Number, default: -1 }, // -1 = unlimited
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Plan', planSchema);