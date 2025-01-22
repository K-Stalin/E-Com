import mongoose from "mongoose";


const reviewSchema = mongoose.Schema({
  reviewerName: { type: String, required: true },
  reviewText: { type: String, required: true },
  starRating: { type: Number,  min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
});


const ReviewModel = mongoose.model.ReviewModel || mongoose.model('ReviewModel',reviewSchema)

export default ReviewModel;