import { Router } from "express";
import { sendEmail } from "../controllers/emailController";

const router = Router();

// POST /api/email
router.post("/send", sendEmail);

export default router;
