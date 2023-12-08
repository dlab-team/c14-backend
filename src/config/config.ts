import 'dotenv/config';
import { createTransport } from 'nodemailer';

const transport = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});
const jwt = process.env.JWT_SECRET ?? 'secreto';

export { jwt, transport };
