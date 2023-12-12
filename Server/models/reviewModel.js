import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: {type: String},
}, { timestamps: true });

const ReviewModel = mongoose.model('Review', reviewSchema);

export default ReviewModel;
