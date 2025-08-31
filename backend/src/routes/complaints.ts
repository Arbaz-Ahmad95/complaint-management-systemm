import express from "express";
import {
  createComplaint,
  getComplaints,
  updateComplaintStatus,
  deleteComplaint,
} from "../controllers/complaintContoller";

const router = express.Router();

router.post("/", createComplaint);
router.get("/", getComplaints);
router.patch("/:id", updateComplaintStatus);
router.delete("/:id", deleteComplaint);

export default router;
