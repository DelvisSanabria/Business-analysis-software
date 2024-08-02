import mongoose from 'mongoose';
import moment from 'moment';
import mongoosePaginate from 'mongoose-paginate-v2';

const EnterpriseSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 100,
    required: true,
  },
  fieldOfWork: {
    type: String,
    minlength: 10,
    maxlength: 100,
    required: true,
  },
  country: {
    type: String,
    minlength: 10,
    maxlength: 100,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    minlength: 10,
    maxlength: 100,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    minlength: 10,
    maxlength: 100,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: moment().format(),
    required: true
  },
  logo:{
    type: String,
  },
  deleted: {
    type: Boolean,
    default: false,
    required: true
  }
});


EnterpriseSchema.plugin(mongoosePaginate);

const Enterprise = mongoose.model("Enterprise", EnterpriseSchema);

export { Enterprise };