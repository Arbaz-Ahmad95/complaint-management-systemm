import nodemailer from 'nodemailer';
import { EmailOptions } from '../types';

// Create email transporter
const createTransporter = async () => {
  try {
    // Create test account automatically with Ethereal Email
    const testAccount = await nodemailer.createTestAccount();
    
    // CORRECT FUNCTION NAME: createTransport (not createTransporter)
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
  } catch (error) {
    console.error('Error creating test account:', error);
    throw error;
  }
};

export const sendEmail = async (options: EmailOptions) => {
  try {
    const transporter = await createTransporter();
    
    const mailOptions = {
      from: '"Complaint System" <noreply@complaintsystem.com>',
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully!');
    console.log('📧 Preview URL:', nodemailer.getTestMessageUrl(info));
    
    return { success: true, previewUrl: nodemailer.getTestMessageUrl(info) };
  } catch (error: any) {
    console.error('❌ Error sending email:', error);
    return { success: false, error };
  }
};

export const sendNewComplaintEmail = async (complaint: any) => {
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9fafb;">
      <h2 style="color: #2563eb;">🚨 New Complaint Submitted</h2>
      <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb;">
        <p><strong>Title:</strong> ${complaint.title}</p>
        <p><strong>Category:</strong> ${complaint.category}</p>
        <p><strong>Priority:</strong> 
          <span style="color: ${
            complaint.priority === 'High' ? '#dc2626' : 
            complaint.priority === 'Medium' ? '#d97706' : 
            '#16a34a'
          }; font-weight: bold;">
            ${complaint.priority}
          </span>
        </p>
        <p><strong>Date Submitted:</strong> ${new Date(complaint.dateSubmitted).toLocaleString()}</p>
        <p><strong>Description:</strong><br>${complaint.description}</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: process.env.ADMIN_EMAIL || 'tausifahmad9525@gmail.com',
    subject: `🚨 New Complaint: ${complaint.title}`,
    html,
  });
};

export const sendStatusUpdateEmail = async (complaint: any, oldStatus: string) => {
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9fafb;">
      <h2 style="color: #059669;">📝 Complaint Status Updated</h2>
      <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #059669;">
        <p><strong>Title:</strong> ${complaint.title}</p>
        <p><strong>Previous Status:</strong> ${oldStatus}</p>
        <p><strong>New Status:</strong> 
          <span style="color: ${
            complaint.status === 'Resolved' ? '#059669' : 
            complaint.status === 'In Progress' ? '#d97706' : 
            '#dc2626'
          }; font-weight: bold;">
            ${complaint.status}
          </span>
        </p>
        <p><strong>Date Updated:</strong> ${new Date().toLocaleString()}</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: process.env.ADMIN_EMAIL || 'tausifahmad9525@gmail.com',
    subject: `📝 Status Updated: ${complaint.title}`,
    html,
  });
};

export const sendEmailNotification = async (subject: string, complaint: any) => {
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #2563eb;">${subject}</h2>
      <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
        <p><strong>Complaint Title:</strong> ${complaint.title}</p>
        <p><strong>Category:</strong> ${complaint.category}</p>
        <p><strong>Priority:</strong> ${complaint.priority}</p>
        <p><strong>Status:</strong> ${complaint.status}</p>
      </div>
      <p><strong>Description:</strong><br>${complaint.description}</p>
    </div>
  `;

  return sendEmail({
    to: process.env.ADMIN_EMAIL || 'tausifahmad9525@gmail.com',
    subject: subject,
    html: html,
  });
};