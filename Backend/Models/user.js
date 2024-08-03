import mongoose from 'mongoose';
import moment from 'moment';
import mongoosePaginate from 'mongoose-paginate-v2';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 100,
    required: true,
  },
  lastName: {
    type: String,
    minlength: 3,
    maxlength: 100,
    required: true,
  },
  email: {
    type: String,
    minlength: 10,
    maxlength: 100,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 100,
    required: true,
  },
  role: {
    type: String,
    minlength: 5,
    maxlength: 100,
    required: true,
  },
  enterprises: {
    type: [mongoose.Schema.Types.ObjectId],
    minlength: 1,
    maxlength: 50,
  },
  payments: {
    type: [mongoose.Schema.Types.ObjectId],
    minlength: 1,
    maxlength: 50,
  },
  savedRequests: {
    type: [mongoose.Schema.Types.ObjectId],
    minlength: 1,
    maxlength: 50,
  },
  plan: {
    type: String,
    maxlength: 50,
    default: 'free',
  },
  statusOfSubscription: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: moment().format(),
    required: true
  },
  updatedAt: {
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

UserSchema.pre('save', function (next) {
  this.updateAt = moment().format();
  next();
});

UserSchema.plugin(mongoosePaginate);

const User = mongoose.model("User", UserSchema);

export { User };