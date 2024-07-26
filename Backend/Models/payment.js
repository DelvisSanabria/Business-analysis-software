const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const moment = require('moment');

const PaymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  enterprise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enterprise',
    required: true,
  },
  paypalUserId: {
    type: String,
    minlength: 15,
    maxlength: 100,
    required: true,
  },
  mountOfPayment: {
    type: String,
    maxlength: 100,
    required: true,
  },
  createdAt: {
    type: Date,
    default: moment().format(),
    required: true
  },
  deleted: {
    type: Boolean,
    default: false,
    required: true
  }
});

PaymentSchema.plugin(mongoosePaginate);

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;