import mongoose, { Schema } from 'mongoose';

const listSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  thumbnailURL: {
    type: String,
  },
  price: {
    type: String,
  },
  videoLink: {
    type: [String],
  },
});

export const CourseColl = mongoose.model('Courses', listSchema);
