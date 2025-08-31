"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComplaint = exports.updateComplaintStatus = exports.getComplaints = exports.createComplaint = void 0;
const complaintModel_1 = __importDefault(require("../models/complaintModel"));
const nodemailer_1 = require("../utils/nodemailer");
// Create a new complaint
const createComplaint = async (req, res) => {
    const { title, description, category, priority } = req.body;
    try {
        const complaint = new complaintModel_1.default({ title, description, category, priority });
        await complaint.save();
        await (0, nodemailer_1.sendEmailNotification)("New Complaint Submitted", complaint);
        res.status(201).json(complaint);
    }
    catch (err) {
        res.status(500).json({ message: "Error creating complaint" });
    }
};
exports.createComplaint = createComplaint;
// Get all complaints
const getComplaints = async (req, res) => {
    try {
        const complaints = await complaintModel_1.default.find();
        res.status(200).json(complaints);
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching complaints" });
    }
};
exports.getComplaints = getComplaints;
// Update complaint status
const updateComplaintStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const complaint = await complaintModel_1.default.findByIdAndUpdate(id, { status }, { new: true });
        if (!complaint) {
            res.status(404).json({ message: "Complaint not found" });
            return;
        }
        await (0, nodemailer_1.sendEmailNotification)("Complaint Status Updated", complaint);
        res.status(200).json(complaint);
    }
    catch (err) {
        res.status(500).json({ message: "Error updating complaint status" });
    }
};
exports.updateComplaintStatus = updateComplaintStatus;
// Delete a complaint
const deleteComplaint = async (req, res) => {
    const { id } = req.params;
    try {
        await complaintModel_1.default.findByIdAndDelete(id);
        res.status(204).json({ message: "Complaint deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Error deleting complaint" });
    }
};
exports.deleteComplaint = deleteComplaint;
