const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productCode: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  productDate: {
    type: Date,
    default: Date.now
  },
  productOriginPrice: {
    type: Number,
    default : 0
  },
  quantity: {
    type: Number,
    default: 0
  },
  productStoreCode: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Product', productSchema);