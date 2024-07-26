const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const moment = require('moment');

const SavedRequestSchema = new mongoose.Schema({
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
  data: {
    type: [Object],
    required: true
  },
  accessToken: {
    type: String,
    required: true
  },
  plan: {
    type: String,
    required: true
  },
  statusOfSubscription: {
    type: String,
    required: true
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


SavedRequestSchema.plugin(mongoosePaginate);

const SavedRequest = mongoose.model("SavedRequest", SavedRequestSchema);

module.exports = SavedRequest;