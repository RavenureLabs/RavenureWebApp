import nodemailler, { TransportOptions } from 'nodemailer';

import nodemailer from 'nodemailer';
import { getHTML } from './html.smtp';

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true', 
  auth: {
    user: process.env.SMTP_AUTH_USER,
    pass: process.env.SMTP_AUTH_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
} as TransportOptions);

export type EmailInformation = {
  from: string;
  to: string;
  subject: string;
}

const sendEmail = async (information: EmailInformation) => {
  const { from, to, subject } = information;

  const code = Math.floor(Math.random() * 1000000).toString();

  const result = await transport.sendMail({
    from: from,
    to: to,
    subject: subject,
    html: getHTML([{key: 'code', value: code}]),
  });

  console.log(result.accepted);
}

export default sendEmail;