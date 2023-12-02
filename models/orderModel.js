const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Order should belong to a user.'],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'Order should have product.'],
    },
    status: {
      type: String,
      required: [true, 'Order should have status.'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Order should have status.'],
    },
    shippingDetails: {
      type: String,
      required: [true, 'Order should have shipping details.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });

  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
