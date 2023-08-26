import nodemailer from 'nodemailer';
import { Email } from '../types/index.d.ts';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function replyToEmail(email: Email, message: string) {
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email.from,
    subject: `Re: ${email.subject}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email.from}`);
  } catch (error) {
    console.error(`Failed to send email: ${error}`);
  }
}