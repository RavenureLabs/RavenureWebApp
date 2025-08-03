import nodemailler, { TransportOptions } from 'nodemailer';
import EmailVerificationCodeModel, { EmailVerificationCodeType } from '@/src/models/verification.model';

import nodemailer from 'nodemailer';
import { getHTML } from './html.smtp';
import { connectToDatabase } from '../database';
import { getSettings } from '@/src/controllers/settings.controller';
import { Settings } from '@/src/models/settings.model';

export type EmailInformation = {
  from: string;
  to: string;
  subject: string;
}

const sendEmail = async (information: EmailInformation) => {
  
  await connectToDatabase();

  const settings: Settings = await (await getSettings(2)).json();

  const transport = nodemailer.createTransport({
  host: settings.smtp.host,
  port: settings.smtp.port,
  secure: settings.smtp.secure, 
  auth: {
    user: settings.smtp.auth.user,
    pass: settings.smtp.auth.pass,
  },
  tls: {
    rejectUnauthorized: false
  }
} as TransportOptions);

  const isAlreadySent = await EmailVerificationCodeModel.findOne({ email: information.to });
  if (isAlreadySent) {
    // if the code is already sent, delete old code and send a new one
    await EmailVerificationCodeModel.deleteOne({ email: information.to });
  }
  const { from, to, subject } = information;
  const code = Math.floor(Math.random() * 1000000).toString();
  await transport.sendMail({
    from: from,
    to: to,
    subject: subject,
    html: getHTML([{key: 'code', value: code}]),
  });
  const evc = new EmailVerificationCodeModel({
    email: to,
    code: code
  });
  await evc.save();
  setTimeout(async () => {
    await EmailVerificationCodeModel.deleteOne({ email: to });
  }, 1000 * 60 * 10); // Delete the code after 10 minutes
}

export const verifyEmailCode = async (email: string, code: string): Promise<boolean> => {
  await connectToDatabase();
  const verification = await EmailVerificationCodeModel.findOne({ email });
  if (!verification) {
    return false;
  }
  if (verification.code === code) {
    await EmailVerificationCodeModel.deleteOne({ email });
    return true;
  }
  return false;
}


export default sendEmail;