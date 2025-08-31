import { Request, Response } from "express";
import Complaint from "../models/complaintModel";
import { sendEmailNotification } from "../utils/nodemailer";

// Create a new complaint
export const createComplaint = async (req: Request, res: Response): Promise<void> => {
  const { title, description, category, priority } = req.body;

  try {
    const complaint = new Complaint({ title, description, category, priority });
    await complaint.save();

    await sendEmailNotification("New Complaint Submitted", complaint);

    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Error creating complaint" });
  }
};

// Get all complaints
export const getComplaints = async (req: Request, res: Response): Promise<void> => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Error fetching complaints" });
  }
};

// Update complaint status
export const updateComplaintStatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const complaint = await Complaint.findByIdAndUpdate(id, { status }, { new: true });

    if (!complaint) {
      res.status(404).json({ message: "Complaint not found" });
      return;
    }

    await sendEmailNotification("Complaint Status Updated", complaint);

    res.status(200).json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Error updating complaint status" });
  }
};

// Delete a complaint
export const deleteComplaint = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await Complaint.findByIdAndDelete(id);
    res.status(204).json({ message: "Complaint deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting complaint" });
  }
};
