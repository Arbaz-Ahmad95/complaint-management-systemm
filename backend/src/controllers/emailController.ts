import { Request, Response } from "express";
import sgMail from "@sendgrid/mail";

// set API key from env
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendEmail = async (req: Request, res: Response): Promise<void> => {
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
      to,                                // receiver email
      from: process.env.SENDGRID_FROM,   // sender (must be verified in SendGrid)
      subject,
      text,
      html: html || text, // fallback if html not provided
    };

    await sgMail.send(msg);

    res.status(200).json({ message: "✅ Email sent successfully" });
  } catch (error) {
    console.error("❌ Email send error:", error);
    res.status(500).json({ message: "Error sending email", error });
  }
};
