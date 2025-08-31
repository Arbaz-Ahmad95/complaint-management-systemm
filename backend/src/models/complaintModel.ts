import mongoose, { Document, Schema } from "mongoose";

export interface IComplaint extends Document {
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  dateSubmitted: Date;
}

const complaintSchema = new Schema<IComplaint>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    priority: { type: String, required: true },
    status: { type: String, default: "Pending" },
    dateSubmitted: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Complaint = mongoose.model<IComplaint>("Complaint", complaintSchema);

export default Complaint;
