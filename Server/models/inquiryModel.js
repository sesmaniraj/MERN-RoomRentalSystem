import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'Pending' }, // Can be 'Pending', 'Accepted', or 'Rejected'
}, { timestamps: true });

const InquiryModel = mongoose.model('Inquiry', inquirySchema);

export default InquiryModel;
