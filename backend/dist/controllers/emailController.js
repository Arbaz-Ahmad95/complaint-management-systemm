"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
// set API key from env
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
const sendEmail = async (req, res) => {
    try {
        const { to, subject, text, html } = req.body;
        if (!to || !subject || !text) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        if (!process.env.SENDGRID_FROM) {
            res.status(500).json({ message: "Missing sender email configuration" });
            return;
        }
        const msg = {
            to, // receiver email
            from: process.env.SENDGRID_FROM, // sender (must be verified in SendGrid)
            subject,
            text,
            html: html || text, // fallback if html not provided
        };
        await mail_1.default.send(msg);
        res.status(200).json({ message: "✅ Email sent successfully" });
    }
    catch (error) {
        console.error("❌ Email send error:", error);
        res.status(500).json({ message: "Error sending email", error });
    }
};
exports.sendEmail = sendEmail;
