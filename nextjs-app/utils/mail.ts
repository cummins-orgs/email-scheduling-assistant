import nodemailer from 'nodemailer';
import { Email } from '../types/index';

const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD,
  },
});

export const receiveEmail = async (): Promise<Email | null> => {
  // This function should be implemented to receive emails.
  // As Node.js doesn't support receiving emails natively, you might need to use a service like Mailgun or SendGrid.
  // For the purpose of this task, we'll assume this function is implemented and returns an Email object.
  return null;
};

export const sendEmail = async (email: Email): Promise<void> => {
  const mailOptions = {
    from: EMAIL_ADDRESS,
    to: email.to,
    subject: email.subject,
    text: email.body,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};