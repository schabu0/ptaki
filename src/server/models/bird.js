import mongoose, { Schema } from 'mongoose';

const BirdSchema = new Schema({
  name: {
    type: String,
    unique: false
  },
  description: {
    type: String,
    unique: false
  },
  shortDescription: {
    type: String,
    unique: false
  },
  quantity: {
    type: Number,
    unique: false
  },
  threats: {
    type: String,
    unique: false
  },
  localization: {
    type: String,
    unique: false
  },
  photo: {
    type: String,
    unique: false
  }
});

export default mongoose.model('Bird', BirdSchema);
