const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const orderSchema = new mongoose.Schema({
  items: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    image: String
  }],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'on the way', 'delivered'], default: 'pending' },
  orderId: { type: String, default: uuidv4 },
  timestamp: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Assuming there's a User model
  feedback: String
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
